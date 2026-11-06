## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)


## Secrets, Telemetria, Métricas e Logs (Pulumi ESC, Axiom, Upstash)

- **Gestão de Chaves e Variáveis de Ambiente (Pulumi ESC):**
  - Sempre que precisar de qualquer operação, consulta, configuração ou injeção referente a chaves de API, variáveis de ambiente e segredos (`keys` e `variables`), utilize o **Pulumi ESC** (`pulumi esc`).
  - Nunca hardcodear segredos diretamente no código ou expor variáveis sensíveis.

- **Métricas, Telemetria, Logs e Debug (Axiom & Upstash):**
  - Sempre que precisar de métricas, telemetria, logs ou rotinas de debug, utilize o **Axiom** e o **Upstash**.
