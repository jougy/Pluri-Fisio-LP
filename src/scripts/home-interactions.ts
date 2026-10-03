// home-interactions.ts - Scripts essenciais para preços, sanfona/accordion dos recursos e carrossel responsivo

export function setupPricing() {
  const cycleButtons = document.querySelectorAll<HTMLButtonElement>(".cycle-btn");
  const cards = document.querySelectorAll<HTMLElement>(".plan-card");
  const btnProf = document.getElementById("btnAudienceProf") as HTMLButtonElement | null;
  const btnClinic = document.getElementById("btnAudienceClinic") as HTMLButtonElement | null;
  const btnEnterprise = document.getElementById("btnAudienceEnterprise") as HTMLButtonElement | null;
  const groupProf = document.getElementById("plansGroupProf");
  const groupClinic = document.getElementById("plansGroupClinic");
  const groupEnterprise = document.getElementById("plansGroupEnterprise");
  const cyclesGroup = document.getElementById("cyclesSwitcherGroup");
  const freeHighlightPane = document.getElementById("freePlanHighlightPane");
  const plansMobileNav = document.getElementById("plansMobileNav");

  let currentAudience: "prof" | "clinic" | "enterprise" = "prof";
  let currentCycle: string = "mensal";

  // Seletor de Perfil Master (Profissional x Clínica x Enterprise)
  function selectAudience(target: "prof" | "clinic" | "enterprise") {
    currentAudience = target;

    if (btnProf) {
      btnProf.classList.toggle("active", target === "prof");
      btnProf.setAttribute("aria-selected", target === "prof" ? "true" : "false");
    }
    if (btnClinic) {
      btnClinic.classList.toggle("active", target === "clinic");
      btnClinic.setAttribute("aria-selected", target === "clinic" ? "true" : "false");
    }
    if (btnEnterprise) {
      btnEnterprise.classList.toggle("active", target === "enterprise");
      btnEnterprise.setAttribute("aria-selected", target === "enterprise" ? "true" : "false");
    }

    if (target === "enterprise") {
      if (groupProf) groupProf.style.display = "none";
      if (groupClinic) groupClinic.style.display = "none";
      if (groupEnterprise) groupEnterprise.style.display = "";
      if (cyclesGroup) cyclesGroup.style.display = "none";
      if (freeHighlightPane) freeHighlightPane.style.display = "none";
    } else {
      if (cyclesGroup) cyclesGroup.style.display = "flex";
      if (groupEnterprise) groupEnterprise.style.display = "none";

      if (currentCycle === "free") {
        if (groupProf) groupProf.style.display = "none";
        if (groupClinic) groupClinic.style.display = "none";
        if (freeHighlightPane) freeHighlightPane.style.display = "";
      } else {
        if (freeHighlightPane) freeHighlightPane.style.display = "none";
        if (groupProf) groupProf.style.display = target === "prof" ? "" : "none";
        if (groupClinic) groupClinic.style.display = target === "clinic" ? "" : "none";
      }
    }

    // Ocultar/Exibir o indicador mobile de planos dependendo se está em enterprise ou free
    if (plansMobileNav) {
      plansMobileNav.style.display = (target === "enterprise" || currentCycle === "free") ? "none" : "";
    }
  }

  if (btnProf) btnProf.addEventListener("click", () => selectAudience("prof"));
  if (btnClinic) btnClinic.addEventListener("click", () => selectAudience("clinic"));
  if (btnEnterprise) btnEnterprise.addEventListener("click", () => selectAudience("enterprise"));

  if (!cycleButtons.length || !cards.length) return;

  const formatBRL = (val: number) =>
    Number.isInteger(val) ? `R$ ${val}` : `R$ ${val.toFixed(2).replace(".", ",")}`;

  // Tabela oficial de preços equivalentes por plano e ciclo (terminando em 7, sem centavos)
  const OFFICIAL_PRICES: Record<string, {
    mensal: { main: string; sub: string; val: number };
    trimestral: { main: string; sub: string; val: number };
    anual: { main: string; sub: string; val: number };
  }> = {
    prof_basico: {
      mensal: { main: "R$ 57/mês", sub: "Cobrado mensalmente", val: 57 },
      trimestral: { main: "R$ 47/mês", sub: "Total R$ 141 por trimestre", val: 47 },
      anual: { main: "R$ 37/mês", sub: "Total R$ 444 por ano", val: 37 },
    },
    prof_medio: {
      mensal: { main: "R$ 87/mês", sub: "Cobrado mensalmente", val: 87 },
      trimestral: { main: "R$ 67/mês", sub: "Total R$ 201 por trimestre", val: 67 },
      anual: { main: "R$ 57/mês", sub: "Total R$ 684 por ano", val: 57 },
    },
    prof_top: {
      mensal: { main: "R$ 127/mês", sub: "Cobrado mensalmente", val: 127 },
      trimestral: { main: "R$ 107/mês", sub: "Total R$ 321 por trimestre", val: 107 },
      anual: { main: "R$ 87/mês", sub: "Total R$ 1.044 por ano", val: 87 },
    },
    clinica_basico: {
      mensal: { main: "R$ 147/mês", sub: "Cobrado mensalmente", val: 147 },
      trimestral: { main: "R$ 127/mês", sub: "Total R$ 381 por trimestre", val: 127 },
      anual: { main: "R$ 97/mês", sub: "Total R$ 1.164 por ano", val: 97 },
    },
    clinica_medio: {
      mensal: { main: "R$ 267/mês", sub: "Cobrado mensalmente", val: 267 },
      trimestral: { main: "R$ 227/mês", sub: "Total R$ 681 por trimestre", val: 227 },
      anual: { main: "R$ 177/mês", sub: "Total R$ 2.124 por ano", val: 177 },
    },
    clinica_top: {
      mensal: { main: "R$ 447/mês", sub: "Cobrado mensalmente", val: 447 },
      trimestral: { main: "R$ 387/mês", sub: "Total R$ 1.161 por trimestre", val: 387 },
      anual: { main: "R$ 297/mês", sub: "Total R$ 3.564 por ano", val: 297 },
    },
  };

  // Pré-computar elementos para todos os cards
  const cardData = Array.from(cards).map(card => {
    const cardId = card.id;
    const planId = cardId.replace("card-", "");
    const mainEl = card.querySelector<HTMLElement>("[data-price-main]");
    const subEl = card.querySelector<HTMLElement>("[data-price-sub]");
    const ctaBtn = card.querySelector<HTMLAnchorElement>(".plan-cta-btn");
    const defaultCta = ctaBtn?.getAttribute("data-cta-default") || "Escolher Plano";

    return {
      cardId,
      planId,
      mainEl,
      subEl,
      ctaBtn,
      defaultCta,
    };
  });

  function setCycle(cycleId: string) {
    currentCycle = cycleId;

    cycleButtons.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-cycle") === cycleId);
    });

    if (cycleId === "free") {
      // Exibe card especial de Teste Gratuito de 7 dias em destaque limpo
      if (freeHighlightPane) freeHighlightPane.style.display = "";
      if (groupProf) groupProf.style.display = "none";
      if (groupClinic) groupClinic.style.display = "none";
      if (plansMobileNav) plansMobileNav.style.display = "none";
    } else {
      if (freeHighlightPane) freeHighlightPane.style.display = "none";
      if (plansMobileNav && currentAudience !== "enterprise") plansMobileNav.style.display = "";
      if (currentAudience === "prof") {
        if (groupProf) groupProf.style.display = "";
        if (groupClinic) groupClinic.style.display = "none";
      } else if (currentAudience === "clinic") {
        if (groupProf) groupProf.style.display = "none";
        if (groupClinic) groupClinic.style.display = "";
      }
    }

    for (let i = 0; i < cardData.length; i++) {
      const data = cardData[i];
      const planPrices = OFFICIAL_PRICES[data.planId];

      if (cycleId === "free") {
        if (data.mainEl) data.mainEl.textContent = "7 Dias Grátis";
        if (data.subEl) data.subEl.textContent = "Experimente com 20 atendimentos inclusos";
        if (data.ctaBtn) {
          data.ctaBtn.textContent = "Experimente Grátis";
          data.ctaBtn.href = "http://pluri.health/auth/cadastro?trial=true";
        }
      } else {
        const cycleKey = (cycleId === "anual" ? "anual" : cycleId === "trimestral" ? "trimestral" : "mensal") as "mensal" | "trimestral" | "anual";
        const cycleParam = cycleId === "anual" ? "annual" : cycleId === "trimestral" ? "quarterly" : "monthly";

        if (planPrices) {
          const item = planPrices[cycleKey];
          if (data.mainEl) data.mainEl.textContent = item.main;
          if (data.subEl) data.subEl.textContent = item.sub;
        }

        if (data.ctaBtn) {
          data.ctaBtn.textContent = data.defaultCta;
          data.ctaBtn.href = `http://pluri.health/auth/cadastro?plan=${data.planId}&cycle=${cycleParam}`;
        }
      }
    }
  }

  cycleButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const c = btn.getAttribute("data-cycle");
      if (c) setCycle(c);
    });
  });

  // Sincronizar dots de navegação mobile com o scroll dos cards
  const planDots = document.querySelectorAll<HTMLButtonElement>("#plansDotsTrack .plan-nav-dot");
  function syncPlanCarousel(track: HTMLElement | null) {
    if (!track) return;

    function updateDots() {
      if (!track) return;
      const scrollLeft = track.scrollLeft;
      const cardWidth = track.firstElementChild ? (track.firstElementChild as HTMLElement).offsetWidth : track.clientWidth;
      const activeIdx = Math.min(Math.max(0, Math.round(scrollLeft / (cardWidth + 16))), planDots.length - 1);

      planDots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === activeIdx);
      });
    }

    let ticking = false;
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateDots();
          ticking = false;
        });
        ticking = true;
      }
    }

    track.addEventListener("scroll", onScroll, { passive: true });

    planDots.forEach((dot, idx) => {
      dot.addEventListener("click", () => {
        const targetCard = track.children[idx] as HTMLElement;
        if (targetCard) {
          targetCard.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
        }
      });
    });
  }

  syncPlanCarousel(groupProf);
  syncPlanCarousel(groupClinic);
}

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

  // 1 & 2: Eventos de Clique (Lead, InitiateCheckout, Contact)
  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement)?.closest<HTMLElement>(
      'a[data-pixel-event], button[data-pixel-event], a.plan-cta-btn, a.free-card-cta, .enterprise-primary-btn'
    );
    if (!target) return;

    const fbq = getFbq();
    if (!fbq) return;

    const explicitEvent = target.getAttribute("data-pixel-event");

    // Trigger 1: Conversão Lead (Cadastro Gratuito / Teste Grátis)
    if (explicitEvent === "Lead" || target.classList.contains("free-card-cta")) {
      fbq("track", "Lead", {
        content_name: "Criar Conta Gratuita",
        content_category: "Registro de Profissional",
        status: "intent"
      });
      return;
    }

    // Trigger 2: Contato WhatsApp / Enterprise
    if (explicitEvent === "Contact" || target.getAttribute("data-contact-channel") === "whatsapp_enterprise") {
      fbq("track", "Contact", {
        content_name: "Contato Enterprise WhatsApp",
        channel: "whatsapp"
      });
      return;
    }

    // Trigger 1: Iniciar Assinatura (Checkout)
    if (target.classList.contains("plan-cta-btn")) {
      const planId = target.getAttribute("data-plan-id") || "plano";
      const planName = target.getAttribute("data-plan-name") || "Plano";
      const audience = target.getAttribute("data-audience") || "prof";
      const parentCard = target.closest(".plan-card");
      const priceText = parentCard?.querySelector("[data-price-main]")?.textContent || "";
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
        fbq("trackCustom", "Interacao_Ciclo_Planos", {
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
