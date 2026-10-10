// scripts/submit-indexnow.mjs - Submissão instantânea de URLs para Bing, IndexNow, Copilot e IAs
const HOST = "plurifisio.com.br";
const KEY = "e4a4b706f8444221940fba77ac47ecb1";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URL_LIST = [
  `https://${HOST}/`,
  `https://${HOST}/#plataforma`,
  `https://${HOST}/#como-funciona`,
  `https://${HOST}/#planos`
];

async function submitIndexNow() {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URL_LIST
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow"
  ];

  console.log("🚀 Enviando URLs para IndexNow (Bing, Copilot, ChatGPT Search)...");

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify(payload)
      });

      console.log(`📡 [${endpoint}] Status: ${response.status} (${response.statusText || 'OK'})`);
    } catch (err) {
      console.error(`❌ Erro ao enviar para ${endpoint}:`, err.message);
    }
  }

  console.log("✅ Concluído! Motores de busca notificados com sucesso.");
}

submitIndexNow();
