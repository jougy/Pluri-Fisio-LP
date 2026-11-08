// home-interactions.ts - Scripts essenciais para preços, sanfona/accordion dos recursos e carrossel responsivo

// Interatividade das Sanfonas (Accordions) da Seção 3 (Workflow) - Card Inteiro Clicável
export function setupWorkflowAccordion() {
  const accordionCards = document.querySelectorAll<HTMLElement>("[data-accordion-card]");
  if (!accordionCards.length) return;

  accordionCards.forEach((card) => {
    const body = card.querySelector<HTMLElement>(".accordion-body");
    const toggleText = card.querySelector<HTMLElement>(".toggle-text");

    if (!body) return;

    function toggleCard() {
      const isExpanded = card.getAttribute("aria-expanded") === "true";
      const nextState = !isExpanded;

      card.setAttribute("aria-expanded", String(nextState));
      card.classList.toggle("is-open", nextState);

      if (toggleText) {
        toggleText.textContent = nextState ? "Ver menos" : "Ver mais";
      }
    }

    card.addEventListener("click", toggleCard);

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleCard();
      }
    });
  });
}

export function setupModal() {
  const overlay = document.getElementById("featuresModalOverlay");
  const openBtn = document.getElementById("btnOpenFeaturesModal");
  const closeBtn = document.getElementById("btnCloseFeaturesModal");
  const ctaBtn = document.getElementById("modalCtaPlanos");

  if (!overlay) return;

  function close() {
    overlay?.classList.remove("is-active");
    document.body.style.overflow = "";
  }

  openBtn?.addEventListener("click", () => {
    overlay?.classList.add("is-active");
    document.body.style.overflow = "hidden";
  });

  closeBtn?.addEventListener("click", close);
  ctaBtn?.addEventListener("click", close);

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("is-active")) {
      close();
    }
  });

  // Troca de abas dentro do modal com atualização de estado ARIA
  const tabBtns = overlay.querySelectorAll<HTMLButtonElement>(".modal-tab-btn");
  const tabPanels = overlay.querySelectorAll<HTMLElement>(".modal-tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const targetId = btn.getAttribute("data-tab-target");
      if (!targetId) return;

      tabBtns.forEach((b) => {
        const isCurrent = b === btn;
        b.classList.toggle("active", isCurrent);
        b.setAttribute("aria-selected", String(isCurrent));
      });

      tabPanels.forEach((panel) => {
        const isCurrent = panel.id === targetId;
        panel.classList.toggle("active", isCurrent);
        panel.setAttribute("aria-hidden", String(!isCurrent));
      });
    });
  });
}

export function setupWorkflowResponsiveCarousel() {
  const section = document.getElementById("como-funciona");
  const viewport = document.getElementById("workflowCarouselViewport");
  const track = document.getElementById("workflowCardsTrack");
  const dots = document.querySelectorAll<HTMLButtonElement>("#workflowDotsList .carousel-dot");

  if (!section || !viewport || !track) return;

  const slides = track.querySelectorAll<HTMLElement>(".workflow-carousel-slide");
  if (!slides.length) return;

  function updateArrowsAndDots() {
    const scrollLeft = track?.scrollLeft || 0;
    const slideWidth = slides[0]?.offsetWidth || track?.clientWidth || 1;
    const currentIndex = Math.min(
      Math.max(0, Math.round(scrollLeft / slideWidth)),
      slides.length - 1
    );

    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === currentIndex);
    });
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      const slide = slides[idx];
      if (slide && track) {
        track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
      }
    });
  });

  let tickingWorkflow = false;
  function onWorkflowScroll() {
    if (!tickingWorkflow) {
      requestAnimationFrame(() => {
        updateArrowsAndDots();
        tickingWorkflow = false;
      });
      tickingWorkflow = true;
    }
  }

  track.addEventListener("scroll", onWorkflowScroll, { passive: true });
}

// Disparo Inteligente de Eventos do Meta Pixel (Facebook Ads) - 7 Triggers Completos
export function setupMetaPixelTracking() {
  if (typeof window === "undefined") return;

  // Guarda de idempotência: assegura que este setup só execute UMA única vez
  const globalWin = window as unknown as {
    __metaPixelTrackingInitialized?: boolean;
    fbq?: (...args: unknown[]) => void;
  };

  if (globalWin.__metaPixelTrackingInitialized) {
    return;
  }
  globalWin.__metaPixelTrackingInitialized = true;

  const getFbq = () => globalWin.fbq;

  // 1 & 2: Eventos de Clique (Lead, Click_Cta_Cadastro, intencao_ciclo_planos, Contact, InitiateCheckout)
  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement)?.closest<HTMLElement>(
      'a[data-pixel-event], button[data-pixel-event], a.plan-cta-btn, a.free-card-cta, .enterprise-primary-btn, a[href*="/auth/cadastro"]'
    );
    if (!target) return;

    const fbq = getFbq();
    if (!fbq) return;

    const explicitEvent = target.getAttribute("data-pixel-event");
    const isFreeTrial = explicitEvent === "Lead" || explicitEvent === "StartTrial" || target.classList.contains("free-card-cta") || target.closest(".bento-trial") !== null;
    const isPlanCta = target.classList.contains("plan-cta-btn");
    const isEnterprise = target.classList.contains("enterprise-primary-btn");
    const isAuthCadastro = explicitEvent === "Click_Cta_Cadastro" || target.getAttribute("href")?.includes("/auth/cadastro");

    // Trigger: Contato WhatsApp / Enterprise
    if (explicitEvent === "Contact" || target.getAttribute("data-contact-channel") === "whatsapp_enterprise") {
      fbq("track", "Contact", {
        content_name: "Contato Enterprise WhatsApp",
        channel: "whatsapp"
      });
      return;
    }

    // Regra: Botões de teste gratuito disparam StartTrial (evento padrão Meta sem valor zerado para evitar erro no Gerenciador)
    if (isFreeTrial) {
      fbq("track", "StartTrial", {
        content_name: target.getAttribute("data-plan-name") || "Teste Gratuito 7 Dias",
        content_category: "Trial"
      });
    }

    // Regra: Todos os botões que levam para a página de cadastro devem disparar click_cta_cadastro
    if (isAuthCadastro || isFreeTrial || isPlanCta || isEnterprise) {
      fbq("trackCustom", "click_cta_cadastro", {
        content_name: isFreeTrial ? (target.getAttribute("data-plan-name") || "Teste Gratuito") : target.getAttribute("data-plan-name") || "Cadastro",
        content_category: isFreeTrial ? "Trial" : "Plano Pago",
        plan_id: target.getAttribute("data-plan-id") || (isFreeTrial ? "free_trial" : "cadastro"),
        status: "intent"
      });
    }

    // InitiateCheckout para compra de planos pagos
    if (isPlanCta && !isFreeTrial) {
      const planId = target.getAttribute("data-plan-id") || "plano";
      const planName = target.getAttribute("data-plan-name") || "Plano";
      const audience = target.getAttribute("data-audience") || "prof";
      const parentCard = target.closest(".plan-card");
      const bentoPriceEl = document.getElementById("bentoPrice");
      const priceText = parentCard?.querySelector("[data-price-main]")?.textContent || bentoPriceEl?.textContent || "";
      const priceMatch = priceText.match(/[\d,.]+/);
      const parsedValue = priceMatch ? parseFloat(priceMatch[0].replace(".", "").replace(",", ".")) : 0;

      fbq("track", "InitiateCheckout", {
        content_name: `Plano ${planName}`,
        content_ids: [planId],
        content_type: "product",
        content_category: audience === "clinic" ? "Clínica" : "Profissional",
        currency: "BRL",
        value: parsedValue
      });
    }

    // Trigger Enterprise Checkout
    if (isEnterprise) {
      fbq("track", "InitiateCheckout", {
        content_name: "Plano Enterprise",
        content_ids: ["enterprise"],
        content_type: "product",
        content_category: "Enterprise",
        currency: "BRL",
        value: 0
      });
    }
  });

  // Trigger 3: Visualização da Seção de Planos (ViewContent)
  let plansViewed = false;
  const plansSection = document.getElementById("planos");
  if (plansSection && "IntersectionObserver" in window) {
    const plansObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !plansViewed) {
          plansViewed = true;
          plansObserver.disconnect();
          const fbq = getFbq();
          if (fbq) {
            fbq("track", "ViewContent", {
              content_name: "Secao_Planos",
              content_category: "Precos_e_Assinaturas"
            });
          }
        }
      });
    }, { threshold: 0.35 });
    plansObserver.observe(plansSection);
  }

  // Trigger 4: Abertura do Modal de Funcionalidades (ViewContent - Modal)
  let modalViewed = false;
  const modalOverlay = document.getElementById("featuresModalOverlay");
  const btnOpenModal = document.getElementById("btnOpenFeaturesModal");

  const trackModalOpen = () => {
    if (modalViewed) return;
    modalViewed = true;
    if (modalMutationObserver) modalMutationObserver.disconnect();
    btnOpenModal?.removeEventListener("click", trackModalOpen);
    const fbq = getFbq();
    if (fbq) {
      fbq("track", "ViewContent", {
        content_name: "Modal_Funcionalidades_Clinicas",
        content_category: "Diferenciais_e_Recursos"
      });
    }
  };

  btnOpenModal?.addEventListener("click", trackModalOpen);
  let modalMutationObserver: MutationObserver | null = null;
  if (modalOverlay) {
    modalMutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          if (modalOverlay.classList.contains("is-active")) {
            trackModalOpen();
          }
        }
      });
    });
    modalMutationObserver.observe(modalOverlay, { attributes: true });
  }

  // Trigger 5: Interação com Seletor de Perfil ou Ciclos de Preço
  const audienceButtons = document.querySelectorAll(".audience-toggle-btn");
  audienceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const audience = btn.getAttribute("data-audience") || "prof";
      const fbq = getFbq();
      if (fbq) {
        fbq("trackCustom", "Interacao_Audience_Planos", {
          audience_selected: audience
        });
      }
    });
  });

  const cycleButtons = document.querySelectorAll(".cycle-btn");
  cycleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const cycle = btn.getAttribute("data-cycle") || "mensal";
      const fbq = getFbq();
      if (fbq) {
        fbq("trackCustom", "intencao_ciclo_planos", {
          cycle_selected: cycle
        });
      }
    });
  });

  // Trigger 6: Tempo de Permanência Qualificado (+30 segundos)
  let timer30sTracked = false;
  window.setTimeout(() => {
    if (!timer30sTracked) {
      timer30sTracked = true;
      const fbq = getFbq();
      if (fbq) {
        fbq("trackCustom", "Tempo_Qualificado_30s", {
          page: window.location.pathname
        });
      }
    }
  }, 30000);

  // Trigger 7: Rolagem Profunda (Scroll Profundo 70% da página ou container de snap)
  let scrollDeepTracked = false;
  const snapContainer = document.querySelector(".snap-main-container") as HTMLElement | null;

  const checkScrollDepth = () => {
    if (scrollDeepTracked) return;

    let scrollPercentage = 0;
    if (snapContainer && snapContainer.scrollHeight > snapContainer.clientHeight) {
      const currentScroll = snapContainer.scrollTop + snapContainer.clientHeight;
      scrollPercentage = (currentScroll / snapContainer.scrollHeight) * 100;
    } else {
      const totalDocHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalDocHeight > 0) {
        scrollPercentage = (window.scrollY / totalDocHeight) * 100;
      }
    }

    if (scrollPercentage >= 70) {
      scrollDeepTracked = true;
      window.removeEventListener("scroll", checkScrollDepth);
      if (snapContainer) snapContainer.removeEventListener("scroll", checkScrollDepth);
      const fbq = getFbq();
      if (fbq) {
        fbq("trackCustom", "Scroll_Profundo_70", {
          page: window.location.pathname
        });
      }
    }
  };

  window.addEventListener("scroll", checkScrollDepth, { passive: true });
  if (snapContainer) {
    snapContainer.addEventListener("scroll", checkScrollDepth, { passive: true });
  }
}

// Navegação suave em âncoras acionada apenas sob clique de link (evita lag no scroll manual do mouse/trackpad)
export function setupSmoothAnchors() {
  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement)?.closest('a[href^="#"]');
    if (!target) return;
    const href = target.getAttribute("href");
    if (!href || href === "#" || href === "#conteudo") return;
    const targetEl = document.querySelector(href);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", href);
    }
  });
}
