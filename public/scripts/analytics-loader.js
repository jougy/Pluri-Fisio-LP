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
	fbq("track", "PageView");
}
// Carrega analíticos na ociosidade ou após primeira interação do usuário
if ("requestIdleCallback" in window) {
	requestIdleCallback(() => {
		setTimeout(loadAnalyticsScripts, 1500);
	});
} else {
	setTimeout(loadAnalyticsScripts, 2e3);
}
[
	"scroll",
	"keydown",
	"pointerdown",
	"touchstart"
].forEach(function(evt) {
	window.addEventListener(evt, loadAnalyticsScripts, {
		once: true,
		passive: true
	});
});
