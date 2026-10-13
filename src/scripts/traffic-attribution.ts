/**
 * traffic-attribution.ts
 * 
 * Preserva e propaga parâmetros de tráfego (UTMs, fbclid, gclid, etc.)
 * entre a Landing Page (plurifisio.com.br) e o SaaS (app.plurifisio.com.br).
 * 
 * Além disso:
 * - Salva parâmetros em cookies de 1ª parte no domínio pai (.plurifisio.com.br)
 * - Atualiza dinamicamente links para o SaaS em tempo real
 */

const TRACKING_PARAMS = [
  "fbclid",
  "gclid",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "ref",
  "r",
] as const;

const COOKIE_DOMAIN = ".plurifisio.com.br";
const STORAGE_KEY = "pluri_traffic_params";

function getTopLevelDomain(): string {
  if (typeof window === "undefined") return "";
  const hostname = window.location.hostname;
  if (hostname.endsWith("plurifisio.com.br")) {
    return COOKIE_DOMAIN;
  }
  return "";
}

function setSharedCookie(name: string, value: string, days = 30) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  const domainPart = getTopLevelDomain() ? `; domain=${getTopLevelDomain()}` : "";
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expires}; path=/${domainPart}; SameSite=Lax; Secure`;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(^|;\\s*)(${name})=([^;]*)`));
  return match ? decodeURIComponent(match[3]) : null;
}

/**
 * Extrai parâmetros de rastreamento da URL atual ou do armazenamento local/cookies
 */
export function collectTrackingParams(): Record<string, string> {
  if (typeof window === "undefined") return {};

  const currentUrlParams = new URLSearchParams(window.location.search);
  const collected: Record<string, string> = {};

  // 1. Verificar parâmetros na URL atual
  let hasNewTracking = false;
  TRACKING_PARAMS.forEach((param) => {
    const val = currentUrlParams.get(param);
    if (val) {
      collected[param] = val;
      hasNewTracking = true;
    }
  });

  // Se encontramos novos parâmetros, salvar em cookie e localStorage
  if (hasNewTracking) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(collected));
    } catch (_) {}

    Object.entries(collected).forEach(([k, v]) => {
      setSharedCookie(`pluri_${k}`, v);
    });

    return collected;
  }

  // 2. Fallback: Recuperar do localStorage
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === "object") {
        return parsed as Record<string, string>;
      }
    }
  } catch (_) {}

  // 3. Fallback: Recuperar de cookies de 1ª parte
  TRACKING_PARAMS.forEach((param) => {
    const cookieVal = getCookie(`pluri_${param}`);
    if (cookieVal) {
      collected[param] = cookieVal;
    }
  });

  return collected;
}

/**
 * Anexa os parâmetros de tráfego a uma URL de destino (ex: app.plurifisio.com.br)
 */
export function decorateUrlWithTracking(targetUrl: string, params: Record<string, string>): string {
  try {
    const url = new URL(targetUrl, window.location.origin);
    Object.entries(params).forEach(([key, val]) => {
      if (val && !url.searchParams.has(key)) {
        url.searchParams.set(key, val);
      }
    });
    return url.toString();
  } catch (_) {
    return targetUrl;
  }
}

/**
 * Atualiza todos os links do DOM que apontam para o app/SaaS para carregar
 * os parâmetros de atribuição sem perder o plano ou parâmetros originais.
 */
export function setupTrafficAttribution() {
  if (typeof window === "undefined") return;

  const params = collectTrackingParams();
  if (Object.keys(params).length === 0) return;

  function updateLinks() {
    const links = document.querySelectorAll<HTMLAnchorElement>(
      'a[href*="app.plurifisio.com.br"], a[href^="/auth/cadastro"], a[href^="/auth"]'
    );

    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const decorated = decorateUrlWithTracking(href, params);
      if (decorated !== href) {
        link.setAttribute("href", decorated);
      }
    });
  }

  // Executa na inicialização
  updateLinks();

  // Observa mudanças dinâmicas no DOM (ex: Bento pricing trocando de aba ou plano)
  const observer = new MutationObserver(() => {
    updateLinks();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["href"],
  });
}
