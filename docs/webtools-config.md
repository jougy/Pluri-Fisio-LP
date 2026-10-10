# Pluri Fisio — Configuração de Webtools, Analytics e Indexação por IA

Documento central com todas as credenciais, IDs, gatilhos de conversão e configurações dos Webtools da Landing Page (`plurifisio.com.br`) e integração com o SaaS (`app.plurifisio.com.br`).

---

## 1. Microsoft Bing Webmaster Tools & IndexNow (IA Indexing)

- **Domínio Principal:** `https://plurifisio.com.br`
- **Status do Bing Webmaster:** Verificado e Ativo
- **Sitemap Submetido:** `https://plurifisio.com.br/sitemap.xml`
- **Chave de API IndexNow:** `e4a4b706f8444221940fba77ac47ecb1`
- **Arquivo de Validação:** `public/e4a4b706f8444221940fba77ac47ecb1.txt`
  - URL Pública: `https://plurifisio.com.br/e4a4b706f8444221940fba77ac47ecb1.txt`
- **Script de Submissão Instantânea:** `npm run indexnow` (executa `scripts/submit-indexnow.mjs`)
- **Motores Notificados via IndexNow:**
  - Microsoft Bing
  - Microsoft Copilot
  - ChatGPT Web Search (Browse with Bing)
  - Yandex e outros motores parceiros

---

## 2. Meta Pixel (Facebook & Instagram Ads)

- **Pixel ID:** `1073846021935349`
- **Arquivo de Injeção:** `src/layouts/Layout.astro` (Script no `<head>` + `<noscript>`)
- **Arquivo de Gatilhos:** `src/scripts/home-interactions.ts`
- **Gatilhos e Eventos Mapeados:**
  1. `PageView`: Automático no carregamento da página.
  2. `Lead`: Cliques nos botões de teste grátis / cadastro ("Testar 7 dias grátis").
  3. `InitiateCheckout`: Cliques nos botões de contratação dos planos ("Assinar", "Contratar Enterprise"), enviando nome do plano, público (profissional/clínica) e valor em BRL.
  4. `Contact`: Clique no botão de WhatsApp da modalidade Enterprise.
  5. `ViewContent`: 
     - Entrada na seção de planos (`#planos`) via `IntersectionObserver`.
     - Abertura da Modal de Funcionalidades Clínicas.
  6. `Interacao_Audience_Planos`: Seleção entre Profissional / Clínica / Enterprise.
  7. `Interacao_Ciclo_Planos`: Seleção entre Mensal / Trimestral / Anual.
  8. `Tempo_Qualificado_30s`: Permanência na página por mais de 30 segundos.
  9. `Scroll_Profundo_70`: Rolagem de mais de 70% da página.

---

## 3. Google Analytics 4 (GA4) & Google Tag

- **Measurement ID (GA4):** `G-HM85XTZRHT`
- **Script:** `https://www.googletagmanager.com/gtag/js?id=G-HM85XTZRHT` em `src/layouts/Layout.astro`
- **Configuração de Domínio:** `cookie_domain: '.plurifisio.com.br'` (habilita compartilhamento de sessão entre a LP e `app.plurifisio.com.br`)
- **Eventos Automáticos:** `page_view`, `scroll`, cliques de saída.

---

## 4. Microsoft Clarity (Mapas de Calor e Gravações de Sessão)

- **Projeto ID:** `qj4s7f3g`
- **Arquivo:** `src/layouts/Layout.astro`
- **Integração:** Conectado nativamente ao Bing Webmaster Tools e GA4 para análise de UX, cliques e gravações anônimas de tela.

---

## 5. Google Search Console & SEO Estruturado

- **Sitemap Oficial:** `https://plurifisio.com.br/sitemap.xml`
- **Robots.txt:** `https://plurifisio.com.br/robots.txt` (`Allow: /`)
- **Marcação Estruturada Schema.org (JSON-LD):**
  - `SoftwareApplication`: Identifica o Pluri Fisio como software de saúde e seus planos.
  - `MedicalWebPage`: Marcação contextual para fisioterapia, prontuários e LGPD.
  - `FAQPage`: Perguntas frequentes para exibição em destaque na busca e respostas diretas de IA.
