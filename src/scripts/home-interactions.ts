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
  const getFbq = () => (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq;

  // 1 & 2: Eventos de Clique (Lead, Click_Cta_Cadastro, intencao_ciclo_planos, Contact, InitiateCheckout)
  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement)?.closest<HTMLElement>(
      'a[data-pixel-event], button[data-pixel-event], a.plan-cta-btn, a.free-card-cta, .enterprise-primary-btn, a[href*="/auth/cadastro"]'
    );
    if (!target) return;

    const fbq = getFbq();
    if (!fbq) return;

    const explicitEvent = target.getAttribute("data-pixel-event");
    const isFreeTrial = explicitEvent === "Lead" || target.classList.contains("free-card-cta") || target.closest(".bento-trial") !== null;
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

    // Regra: Todos os botões que levam para a página de cadastro devem disparar click_cta_cadastro
    if (isAuthCadastro || isFreeTrial || isPlanCta || isEnterprise) {
      fbq("trackCustom", "click_cta_cadastro", {
        content_name: isFreeTrial ? "Teste Gratuito" : target.getAttribute("data-plan-name") || "Cadastro",
        content_category: isFreeTrial ? "Trial" : "Plano Pago",
        plan_id: target.getAttribute("data-plan-id") || (isFreeTrial ? "free_trial" : "cadastro"),
        status: "intent"
      });
    }

    // Regra: Os botões de plano deverão ter também os eventos de "intencao_ciclo_planos", menos nos cards gratuitos
    if ((isPlanCta || isEnterprise) && !isFreeTrial) {
      const activeCycleBtn = document.querySelector(".cycle-btn.active") as HTMLElement | null;
      const cycle = target.getAttribute("data-cycle") || activeCycleBtn?.getAttribute("data-cycle") || (isEnterprise ? "anual" : "mensal");
      const planId = target.getAttribute("data-plan-id") || "plano";
      const planName = target.getAttribute("data-plan-name") || "Plano";

      fbq("trackCustom", "intencao_ciclo_planos", {
        cycle_selected: cycle,
        plan_id: planId,
        plan_name: planName
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
          const fbq = getFbq();
          if (fbq) {
            fbq("track", "ViewContent", {
              content_name: "Secao_Planos",
              content_category: "Precos_e_Assinaturas"
            });
          }
          plansObserver.disconnect();
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
    const fbq = getFbq();
    if (fbq) {
      fbq("track", "ViewContent", {
        content_name: "Modal_Funcionalidades_Clinicas",
        content_category: "Diferenciais_e_Recursos"
      });
    }
  };

  btnOpenModal?.addEventListener("click", trackModalOpen);
  if (modalOverlay) {
    const modalMutationObserver = new MutationObserver((mutations) => {
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
      const fbq = getFbq();
      if (fbq) {
        fbq("trackCustom", "Scroll_Profundo_70", {
          page: window.location.pathname
        });
      }
      window.removeEventListener("scroll", checkScrollDepth);
      if (snapContainer) snapContainer.removeEventListener("scroll", checkScrollDepth);
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
