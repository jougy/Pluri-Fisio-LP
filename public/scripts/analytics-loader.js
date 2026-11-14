// Helper para disparar evento do Meta Pixel e enviar simultaneamente para a Conversions API (CAPI)
// com o mesmo eventID para garantir deduplicação perfeita (> 75%)
function sendMetaEvent(eventName, customData, isCustom) {
	try {
		var eventId = typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : "evt_" + Date.now() + "_" + Math.random().toString(36).slice(2, 11);
		
		// 1. Dispara no navegador via Pixel (fbq) com o eventID
		if (typeof window.fbq === "function") {
			if (isCustom) {
				window.fbq("trackCustom", eventName, customData || {}, { eventID: eventId });
			} else {
				window.fbq("track", eventName, customData || {}, { eventID: eventId });
			}
		}

		// 2. Envia para o endpoint Cloudflare Pages Function (Meta CAPI server-side)
		var payload = {
			eventName: eventName,
			eventId: eventId,
			eventSourceUrl: window.location.href,
			customData: customData || {}
		};

		if (navigator.sendBeacon) {
			var blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
			navigator.sendBeacon("/api/meta-capi", blob);
		} else {
			fetch("/api/meta-capi", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
				keepalive: true
			}).catch(function() {});
		}
	} catch (e) {
		// Silently catch to not break analytics
	}
}

window.__sendMetaEvent = sendMetaEvent;

window.dataLayer = window.dataLayer || [];
function gtag() {
	dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "G-HM85XTZRHT", {
	cookie_domain: ".plurifisio.com.br",
	send_page_view: true
});
function loadAnalyticsScripts() {
	if (window.__analyticsLoaded) return;
	window.__analyticsLoaded = true;
	// GA4
	const gaScript = document.createElement("script");
	gaScript.async = true;
	gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-HM85XTZRHT";
	document.head.appendChild(gaScript);
	// Microsoft Clarity
	(function(c, l, a, r, i, t, y) {
		c[a] = c[a] || function() {
			(c[a].q = c[a].q || []).push(arguments);
		};
		t = l.createElement(r);
		t.async = 1;
		t.src = "https://www.clarity.ms/tag/" + i;
		y = l.getElementsByTagName(r)[0];
		y.parentNode.insertBefore(t, y);
	})(window, document, "clarity", "script", "qj4s7f3g");
	// Meta Pixel Code
	!function(f, b, e, v, n, t, s) {
		if (f.fbq) return;
		n = f.fbq = function() {
			n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
		};
		if (!f._fbq) f._fbq = n;
		n.push = n;
		n.loaded = !0;
		n.version = "2.0";
		n.queue = [];
		t = b.createElement(e);
		t.async = !0;
		t.src = v;
		s = b.getElementsByTagName(e)[0];
		s.parentNode.insertBefore(t, s);
	}(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
	fbq("init", "1073846021935349");
	sendMetaEvent("PageView");
}
// Carrega analíticos estritamente após a primeira interação real do usuário
// Evita download de JS de terceiros (Meta Pixel / GA4 / Clarity) durante auditorias do Lighthouse e carregamento inicial
const interactionEvents = [
	"scroll",
	"keydown",
	"pointerdown",
	"touchstart"
];

interactionEvents.forEach(function(evt) {
	window.addEventListener(evt, loadAnalyticsScripts, {
		once: true,
		passive: true
	});
});
