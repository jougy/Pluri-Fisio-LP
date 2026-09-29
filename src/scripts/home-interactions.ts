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

  // Pré-computar valores para todos os cards
  const cardData = Array.from(cards).map(card => {
    const cardId = card.id;
    const monthlyVal = parseFloat(card.getAttribute("data-monthly") || "0");
    const mainEl = card.querySelector<HTMLElement>("[data-price-main]");
    const subEl = card.querySelector<HTMLElement>("[data-price-sub]");
    const ctaBtn = card.querySelector<HTMLAnchorElement>(".plan-cta-btn");
    const defaultCta = ctaBtn?.getAttribute("data-cta-default") || "Escolher Plano";

    const quarterlyVal = monthlyVal * 0.9;
    const annualVal = monthlyVal * 0.75;

    return {
      cardId,
      mainEl,
      subEl,
      ctaBtn,
      defaultCta,
      priceCache: {
        free: {
          main: "7 Dias Grátis",
          sub: "Experimente com 20 atendimentos inclusos",
        },
        mensal: { main: `${formatBRL(monthlyVal)}/mês`, sub: "Cobrado mensalmente" },
        trimestral: {
          main: `${formatBRL(quarterlyVal)}/mês`,
          sub: `Total ${formatBRL(quarterlyVal * 3)} por trimestre`,
        },
        anual: {
          main: `${formatBRL(annualVal)}/mês`,
          sub: `Total ${formatBRL(annualVal * 12)} por ano`,
        },
      } as Record<string, { main: string; sub: string }>,
    };
  });

  function setCycle(cycleId: string) {
    currentCycle = cycleId;

    cycleButtons.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-cycle") === cycleId);
    });

    if (cycleId === "free") {
      // Exibe card especial de 7 dias grátis em destaque limpo
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
      const price = data.priceCache[cycleId] || data.priceCache.mensal;
      if (data.mainEl) data.mainEl.textContent = price.main;
      if (data.subEl) data.subEl.textContent = price.sub;
      if (data.ctaBtn) {
        if (cycleId === "free") {
          data.ctaBtn.textContent = "Iniciar 7 Dias Grátis";
          data.ctaBtn.href = "https://plurifisio.com.br/planos?cycle=free";
        } else {
          data.ctaBtn.textContent = data.defaultCta;
          data.ctaBtn.href = "https://plurifisio.com.br/planos";
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

// Interatividade das Sanfonas (Accordions) da Seção 3 (Workflow)
export function setupWorkflowAccordion() {
  const accordionCards = document.querySelectorAll<HTMLElement>("[data-accordion-card]");
  if (!accordionCards.length) return;

  accordionCards.forEach((card) => {
    const trigger = card.querySelector<HTMLButtonElement>(".workflow-card-trigger");
    const body = card.querySelector<HTMLElement>(".accordion-body");
    const toggleText = card.querySelector<HTMLElement>(".toggle-text");

    if (!trigger || !body) return;

    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";
      const nextState = !isExpanded;

      trigger.setAttribute("aria-expanded", String(nextState));
      card.classList.toggle("is-open", nextState);
      body.hidden = !nextState;

      if (toggleText) {
        toggleText.textContent = nextState ? "Ocultar detalhes" : "Ver detalhes";
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

