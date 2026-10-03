# Pluri Fisio — Textos da Landing Page (plurifisio.com.br)

- **Fonte:** `src/pages/index.astro` (página inicial)
- **Data de coleta:** 02/10/2026
- **Escopo:** as 4 seções da landing page (menu, modal e metadados SEO ficam de fora)

**Como ler os identificadores de localização:**

```
[S1 · HeroSection.astro:63]
 │       │                └── linha no arquivo onde o texto está
 │       └──────────────────── arquivo-fonte (em src/)
 └──────────────────────────── seção da página (S1 a S4)
```

**Regras do documento:**

- Cada entrada = um elemento de texto da página. Quando um elemento tem valor + rótulo (ex.: preço e "Cobrado mensalmente"), os dois aparecem em linhas separadas no mesmo bloco.
- Textos gerados por JavaScript (preços por ciclo, títulos do carrossel, variações de CTA) estão marcados como **Conteúdo dinâmico**.
- Ortografia e acentuação estão preservadas exatamente como no código, inclusive erros de digitação originais.

---

## Índice

1. [Seção 1 — Lançamento (Hero)](#seção-1--lançamento-hero-lancamento)
2. [Seção 2 — A Plataforma](#seção-2--a-plataforma-plataforma)
3. [Seção 3 — Principais Funcionalidades](#seção-3--principais-funcionalidades-como-funciona)
4. [Seção 4 — Planos](#seção-4--planos-planos)

---

## Seção 1 — Lançamento (Hero) `#lancamento`

**Objetivo da seção:** Apresentar a marca Pluri Fisio, qualificar o público-alvo (fisioterapeutas e clínicas) e entregar a promessa principal em uma única frase. Conduz o visitante aos CTAs primários — "Começar grátis" (leva aos planos) e "Saiba mais" (leva à plataforma). É a primeira dobra da página, responsável pela primeira impressão e pela navegação para as seções seguintes.

**Arquivo-fonte:** `src/components/home/HeroSection.astro`

### Títulos e textos visíveis

**[S1 · HeroSection.astro:19]** Badge de topo — renderizado letra a letra com animação (mesmo texto no `aria-label`)
> Lançamento Oficial

**[S1 · HeroSection.astro:55]** H1 — nome da marca (também no `aria-label`, linha 54)
> Pluri Fisio

**[S1 · HeroSection.astro:59]** H2 — público-alvo
> Para fisioterapeutas e clínicas

**[S1 · HeroSection.astro:63]** H3 — promessa principal (`aria-labelledby` da seção)
> Solução simples, rápida e prática para seu dia-a-dia de atendimentos.

### Botões e CTAs

**[S1 · HeroSection.astro:68]** CTA primário (âncora → `#planos`)
> Começar grátis

**[S1 · HeroSection.astro:75]** CTA secundário (âncora → `#plataforma`)
> Saiba mais

### Imagens (alt)

**[S1 · HeroSection.astro:46]** Alt do logo da marca
> Pluri Fisio

---

## Seção 2 — A Plataforma `#plataforma`

**Objetivo da seção:** Fixar o posicionamento central do produto ("o sistema de gestão clínica mais Fácil e Completo do Brasil") e mostrar, em carrossel com ilustrações, os 5 diferenciais que sustentam essa promessa: facilidade de aprendizado, dados em um só lugar, agendamentos simplificados, ausência de papel e estrutura para gestão de equipes. Cada diferencial vira um título curto em caixa alta que troca automaticamente na tela.

**Arquivo-fonte:** `src/components/home/PlatformSection.astro`

### Títulos e textos visíveis

**[S2 · PlatformSection.astro:24]** Selo/badge acima do H1
> A PLATAFORMA MAIS RÁPIDA

**[S2 · PlatformSection.astro:28]** H1 — posicionamento (parte destacada em gradiente: "mais Facil e Completo")
> O sistema de gestão clínica mais Facil e Completo do Brasil

### Conteúdo dinâmico — títulos do carrossel (trocados por JavaScript)

**[S2 · PlatformSection.astro:42]** H2 dinâmico (`#showcaseMainTitle`) — estado inicial
> MUITO FACIL DE APRENDER

**[S2 · PlatformSection.astro:68]** Título do slide 1 (`data-title` da ilustração)
> MUITO FACIL DE APRENDER

**[S2 · PlatformSection.astro:80]** Título do slide 2
> TODOS OS DADOS EM UM SÓ LUGAR

**[S2 · PlatformSection.astro:92]** Título do slide 3
> AGENDAMENTOS SIMPLIFICADOS

**[S2 · PlatformSection.astro:104]** Título do slide 4
> LIVRE DE PAPEIS

**[S2 · PlatformSection.astro:116]** Título do slide 5
> ESTRUTURA COMPLETA PARA GESTÃO DE EQUIPES

### Imagens (alt) — mesmos textos dos dots indicadores (linhas 34–38)

**[S2 · PlatformSection.astro:66]** Alt da ilustração 1 (+ `aria-label` do dot 1)
> Muito Fácil de Aprender

**[S2 · PlatformSection.astro:78]** Alt da ilustração 2 (+ `aria-label` do dot 2)
> Todos os Dados em um Só Lugar

**[S2 · PlatformSection.astro:90]** Alt da ilustração 3 (+ `aria-label` do dot 3)
> Agendamentos Simplificados

**[S2 · PlatformSection.astro:102]** Alt da ilustração 4 (+ `aria-label` do dot 4)
> Livre de Papéis

**[S2 · PlatformSection.astro:114]** Alt da ilustração 5 (+ `aria-label` do dot 5)
> Estrutura Completa para Gestão de Equipes

### Acessibilidade e controles

**[S2 · PlatformSection.astro:33]** `aria-label` do indicador de progresso do carrossel
> Progresso dos diferenciais

**[S2 · PlatformSection.astro:54]** `aria-label` do botão anterior
> Item anterior

**[S2 · PlatformSection.astro:61]** `aria-label` do palco de ilustrações
> Ilustrações dos diferenciais

**[S2 · PlatformSection.astro:128]** `aria-label` do botão próximo
> Próximo item

---

## Seção 3 — Principais Funcionalidades `#como-funciona`

**Objetivo da seção:** Detalhar como o produto funciona na rotina clínica, traduzindo o sistema em 6 recursos concretos em cards expandíveis — do auto-cadastro do paciente à evolução inteligente do atendimento. Cada card mostra título + resumo e pode ser aberto com "Ver mais". Responde à objeção "será que eu consigo usar isso no meu dia a dia?".

**Arquivos-fonte:**

- `src/components/home/WorkflowSection.astro`
- `src/data/workflow-steps.ts` (textos dos 6 cards)
- `src/components/workflow/WorkflowCard.astro`
- `src/scripts/home-interactions.ts` (toggle "Ver menos")

### Títulos e textos visíveis

**[S3 · WorkflowSection.astro:28]** H2 da seção
> Principais Funcionalidades

**[S3 · WorkflowSection.astro:59]** Dica de carrossel (aparece no mobile)
> 👉 Deslize para o lado para ver as etapas 4 a 6

### Cards — 6 etapas (src/data/workflow-steps.ts)

**[S3 · workflow-steps.ts:16]** Card 01 — título e resumo
> Auto-Cadastro
> Envie o cadastro completo para o paciente preencher antes da consulta

**[S3 · workflow-steps.ts:26]** Card 02 — título e resumo
> Agendamento simples
> Organize seus agendamentos de forma rápida pensada para facilitar seu dia a dia

**[S3 · workflow-steps.ts:36]** Card 03 — título e resumo
> Anamnese personalizavel
> Crie suas fichas de anamnese com o melhor editor de formulários para se adaptar ao seu jeito e obtenha estatisticas automaticamente

**[S3 · workflow-steps.ts:46]** Card 04 — título e resumo
> Tratamentos Ágeis
> Monte seus planos de tratamentos de forma rápida e dinamica sem perder tempo

**[S3 · workflow-steps.ts:56]** Card 05 — título e resumo
> Controle Financeiro
> Estatisticas completas para te ajudar na tomada de decisões do seu negócio

**[S3 · workflow-steps.ts:66]** Card 06 — título e resumo
> Evolução inteligente
> Evolua seus pacientes utilizando o último atendimento, alterando apenas o necessário, otimizando ao máximo o seu tempo

### Interação (expandir/recolher o card)

**[S3 · WorkflowCard.astro:83]** Gatilho do card — estado fechado
> Ver mais

**[S3 · home-interactions.ts:252]** Gatilho do card — estado aberto (trocado por JS)
> Ver menos

### Acessibilidade

**[S3 · WorkflowSection.astro:56]** `aria-label` do dot do carrossel
> Ver etapas 1 a 3

**[S3 · WorkflowSection.astro:57]** `aria-label` do dot do carrossel
> Ver etapas 4 a 6

---

## Seção 4 — Planos `#planos`

**Objetivo da seção:** Converter o visitante. Seletor de perfil (Profissional / Clínica / Enterprise), ciclos de cobrança com descontos, card de teste grátis de 7 dias, comparação de 6 planos com preços e benefícios, bloco Enterprise sob medida e CTAs diretos para cadastro e WhatsApp. Inclui todos os textos trocados por JavaScript conforme o ciclo/perfil selecionado.

**Arquivos-fonte:**

- `src/components/home/PricingSection.astro`
- `src/data/pricing-plans.ts` (ciclos e planos)
- `src/components/pricing/PlanCard.astro` (card atômico do plano)
- `src/scripts/home-interactions.ts` (preços e textos dinâmicos)

### Cabeçalho da seção

**[S4 · PricingSection.astro:16]** H2 da seção
> Planos

**[S4 · PricingSection.astro:24]** Badge de lançamento (parte em negrito: "Lançamento Especial:")
> Lançamento Especial: Consultoria VIP de implantação e uso inclusa para os primeiros inscritos!

**[S4 · PricingSection.astro:38]** Aba do seletor de perfil
> Profissional

**[S4 · PricingSection.astro:50]** Aba do seletor de perfil
> Clínica

**[S4 · PricingSection.astro:62]** Aba do seletor de perfil
> Enterprise

**[S4 · PricingSection.astro:28]** `aria-label` do seletor de perfil
> Seletor de Perfil

**[S4 · PricingSection.astro:69]** `aria-label` do grupo de ciclos de cobrança
> Ciclo de cobrança

### Ciclos de cobrança (src/data/pricing-plans.ts)

**[S4 · pricing-plans.ts:29]** Ciclo — label e nota
> Grátis
> 7 dias

**[S4 · pricing-plans.ts:30]** Ciclo — label
> Mensal

**[S4 · pricing-plans.ts:31]** Ciclo — label e nota
> Trimestral
> -15%

**[S4 · pricing-plans.ts:32]** Ciclo — label e nota
> Anual
> -35% OFF

### Card de teste grátis (aparece quando o ciclo "Grátis" está ativo)

**[S4 · PricingSection.astro:89]** Badge do card
> 7 DIAS GRÁTIS

**[S4 · PricingSection.astro:91]** H3 do card
> Período de Teste Gratuito de 7 Dias

**[S4 · PricingSection.astro:93]** Parágrafo de apoio
> Acesso completo a todas as funções para você comprovar a velocidade do sistema na sua rotina clínica. Sem cartão de crédito obrigatório.

**[S4 · PricingSection.astro:99]** Especificação — valor e rótulo
> 7 Dias
> Duração do teste

**[S4 · PricingSection.astro:104]** Especificação — valor e rótulo
> 20
> Atendimentos inclusos

**[S4 · PricingSection.astro:109]** Especificação — valor e rótulo
> R$ 0
> Sem cobrança inicial

**[S4 · PricingSection.astro:117]** Item de benefício (negrito: "Acesso completo")
> Acesso completo ao prontuário eletrônico e agenda com WhatsApp

**[S4 · PricingSection.astro:121]** Item de benefício (negrito: "Duplicação em 1 toque")
> Duplicação em 1 toque para evolução ultra-rápida

**[S4 · PricingSection.astro:125]** Item de benefício (negrito: "Consultoria de uso de lançamento")
> Consultoria de uso de lançamento para configurar seus formulários

**[S4 · PricingSection.astro:129]** Item de benefício
> Cancele a qualquer momento com apenas 1 clique

**[S4 · PricingSection.astro:139]** CTA do card de teste
> Experimente Grátis por 7 Dias

### Cards de planos — perfil Profissional (src/data/pricing-plans.ts)

**[S4 · pricing-plans.ts:38]** Plano "Básico" — nome
> Básico

**[S4 · pricing-plans.ts:39]** Plano "Básico" — subtítulo
> Profissional autônomo iniciando consultório

**[S4 · pricing-plans.ts:43]** Plano "Básico" — recurso (negrito)
> 1 acesso simultâneo individual

**[S4 · pricing-plans.ts:44]** Plano "Básico" — recurso (negrito)
> 1 formulário universal + 1 ficha complementar

**[S4 · pricing-plans.ts:45]** Plano "Básico" — recurso
> Pacientes e atendimentos ilimitados

**[S4 · pricing-plans.ts:46]** Plano "Básico" — recurso
> Prontuário eletrônico & evolução rápida

**[S4 · pricing-plans.ts:47]** Plano "Básico" — recurso
> Duplicação rápida: repete o atendimento anterior em 1 toque

**[S4 · pricing-plans.ts:48]** Plano "Básico" — recurso
> Agenda com envio de mensagens no WhatsApp

**[S4 · pricing-plans.ts:49]** Plano "Básico" — recurso (negrito)
> Consultoria de implantação VIP de lançamento inclusa

**[S4 · pricing-plans.ts:51]** Plano "Básico" — CTA
> Escolher Básico

**[S4 · pricing-plans.ts:73]** Plano "Médio" — badge do card
> Mais Popular

**[S4 · pricing-plans.ts:57]** Plano "Médio" — nome
> Médio

**[S4 · pricing-plans.ts:58]** Plano "Médio" — subtítulo
> Alta demanda e fichas personalizadas

**[S4 · pricing-plans.ts:62]** Plano "Médio" — recurso
> 1 acesso simultâneo individual

**[S4 · pricing-plans.ts:63]** Plano "Médio" — recurso (negrito)
> Formulários e fichas 100% ilimitadas e personalizáveis

**[S4 · pricing-plans.ts:64]** Plano "Médio" — recurso (negrito)
> Seu histórico vai com você mesmo se mudar de consultório

**[S4 · pricing-plans.ts:65]** Plano "Médio" — recurso (negrito)
> Controle financeiro de pagamentos e pacotes de sessões

**[S4 · pricing-plans.ts:66]** Plano "Médio" — recurso
> Pacientes e atendimentos ilimitados

**[S4 · pricing-plans.ts:67]** Plano "Médio" — recurso
> Todos os recursos clínicos e duplicação em 1 toque

**[S4 · pricing-plans.ts:68]** Plano "Médio" — recurso (negrito)
> Consultoria de implantação VIP de lançamento inclusa

**[S4 · pricing-plans.ts:70]** Plano "Médio" — CTA
> Escolher Médio

**[S4 · pricing-plans.ts:77]** Plano "Top" — nome
> Top

**[S4 · pricing-plans.ts:78]** Plano "Top" — subtítulo
> Máxima autonomia e apoio de secretária

**[S4 · pricing-plans.ts:82]** Plano "Top" — recurso (negrito)
> 2 acessos simultâneos (você + secretária ou assistente)

**[S4 · pricing-plans.ts:83]** Plano "Top" — recurso (negrito)
> Lembretes automáticos de agendamento por WhatsApp

**[S4 · pricing-plans.ts:84]** Plano "Top" — recurso (negrito)
> Recibos e relatórios de receitas automáticos

**[S4 · pricing-plans.ts:85]** Plano "Top" — recurso (negrito)
> Suporte e atendimento prioritário direto

**[S4 · pricing-plans.ts:86]** Plano "Top" — recurso
> Pacientes e atendimentos ilimitados

**[S4 · pricing-plans.ts:87]** Plano "Top" — recurso
> Todos os recursos do plano Médio inclusos

**[S4 · pricing-plans.ts:88]** Plano "Top" — recurso (negrito)
> Consultoria de implantação VIP de lançamento inclusa

**[S4 · pricing-plans.ts:89]** Plano "Top" — CTA
> Escolher Top

### Cards de planos — perfil Clínica (src/data/pricing-plans.ts)

**[S4 · pricing-plans.ts:99]** Plano Clínica "Básico" — nome
> Básico

**[S4 · pricing-plans.ts:100]** Plano Clínica "Básico" — subtítulo
> Consultórios e salas compartilhadas

**[S4 · pricing-plans.ts:104]** Plano Clínica "Básico" — recurso (negrito)
> 2 acessos simultâneos ao mesmo tempo

**[S4 · pricing-plans.ts:105]** Plano Clínica "Básico" — recurso (negrito)
> Profissionais e colaboradores ilimitados para cadastrar

**[S4 · pricing-plans.ts:106]** Plano Clínica "Básico" — recurso
> Dono da clínica como administrador principal absoluto

**[S4 · pricing-plans.ts:107]** Plano Clínica "Básico" — recurso
> Permissões de acesso padrão e seguras para cada função

**[S4 · pricing-plans.ts:108]** Plano Clínica "Básico" — recurso
> Agendas compartilhadas por salas e macas

**[S4 · pricing-plans.ts:109]** Plano Clínica "Básico" — recurso (negrito)
> Digitalização das suas fichas de papel de graça

**[S4 · pricing-plans.ts:110]** Plano Clínica "Básico" — recurso (negrito)
> Consultoria de implantação VIP de lançamento inclusa

**[S4 · pricing-plans.ts:111]** Plano Clínica "Básico" — CTA
> Escolher Básico

**[S4 · pricing-plans.ts:134]** Plano Clínica "Médio" — badge do card
> Recomendado

**[S4 · pricing-plans.ts:118]** Plano Clínica "Médio" — nome
> Médio

**[S4 · pricing-plans.ts:119]** Plano Clínica "Médio" — subtítulo
> Clínicas consolidadas com equipe

**[S4 · pricing-plans.ts:123]** Plano Clínica "Médio" — recurso (negrito)
> 4 acessos simultâneos ao mesmo tempo

**[S4 · pricing-plans.ts:124]** Plano Clínica "Médio" — recurso (negrito)
> Controle automático de repasses e divisão de atendimentos

**[S4 · pricing-plans.ts:125]** Plano Clínica "Médio" — recurso (negrito)
> Permissões 100% editáveis por função e membro da equipe

**[S4 · pricing-plans.ts:126]** Plano Clínica "Médio" — recurso
> Profissionais e colaboradores ilimitados para cadastrar

**[S4 · pricing-plans.ts:127]** Plano Clínica "Médio" — recurso
> Formulários e fichas personalizáveis para toda a clínica

**[S4 · pricing-plans.ts:128]** Plano Clínica "Médio" — recurso
> Dono no topo com controle total de segurança

**[S4 · pricing-plans.ts:129]** Plano Clínica "Médio" — recurso (negrito)
> Consultoria de implantação VIP de lançamento inclusa

**[S4 · pricing-plans.ts:130]** Plano Clínica "Médio" — CTA
> Escolher Médio

**[S4 · pricing-plans.ts:138]** Plano Clínica "Top" — nome
> Top

**[S4 · pricing-plans.ts:139]** Plano Clínica "Top" — subtítulo
> Grandes clínicas e alta rotatividade

**[S4 · pricing-plans.ts:143]** Plano Clínica "Top" — recurso (negrito)
> 8 acessos simultâneos ao mesmo tempo

**[S4 · pricing-plans.ts:144]** Plano Clínica "Top" — recurso (negrito)
> Histórico completo e trilha de quem acessou cada prontuário

**[S4 · pricing-plans.ts:145]** Plano Clínica "Top" — recurso (negrito)
> Gestão integrada de várias salas, macas e especialidades

**[S4 · pricing-plans.ts:146]** Plano Clínica "Top" — recurso (negrito)
> Personalização total de níveis de hierarquia da equipe

**[S4 · pricing-plans.ts:147]** Plano Clínica "Top" — recurso
> Profissionais e colaboradores ilimitados para cadastrar

**[S4 · pricing-plans.ts:148]** Plano Clínica "Top" — recurso
> Controle total sobre toda a estrutura clínica

**[S4 · pricing-plans.ts:149]** Plano Clínica "Top" — recurso (negrito)
> Consultoria de implantação VIP de lançamento inclusa

**[S4 · pricing-plans.ts:150]** Plano Clínica "Top" — CTA
> Escolher Top

### Bloco Enterprise

**[S4 · PricingSection.astro:184]** Badge do bloco
> Grandes Redes e Hospitais

**[S4 · PricingSection.astro:186]** H3 do bloco
> Soluções Corporativas Sob Medida

**[S4 · PricingSection.astro:188]** Parágrafo de apoio
> Para hospitais, franquias, centros universitários e redes de reabilitação física com mais de 30 profissionais que precisam de governança avançada, banco de dados isolado e suporte 24/7.

**[S4 · PricingSection.astro:195]** Diferencial Enterprise — título e descrição
> Migração Assistida VIP
> Nossos engenheiros importam todo o seu banco de dados de prontuários antigos sem risco de perda.

**[S4 · PricingSection.astro:203]** Diferencial Enterprise — título e descrição
> Múltiplas Unidades e Filiais
> Controle centralizado com permissões hierárquicas por unidade, gestor e profissional.

**[S4 · PricingSection.astro:211]** Diferencial Enterprise — título e descrição
> SLA Dedicado & Gerente de Contas
> Canal direto com time de desenvolvimento e treinamento presencial ou remoto para toda a equipe.

**[S4 · PricingSection.astro:219]** Diferencial Enterprise — título e descrição
> Integrações Customizadas
> Conexão via API com ERPs hospitalares, sistemas de faturamento TISS/TUSS e biometria.

**[S4 · PricingSection.astro:233]** CTA primário Enterprise
> Contratar Solução Enterprise

**[S4 · PricingSection.astro:244]** CTA secundário Enterprise (WhatsApp)
> Falar com Consultor no WhatsApp

### Navegação mobile e rodapé da seção

**[S4 · PricingSection.astro:164]** Dot de navegação mobile — label (`aria-label`: "Plano 1: Básico", linha 163)
> Básico

**[S4 · PricingSection.astro:167]** Dot de navegação mobile — label (`aria-label`: "Plano 2: Médio", linha 166)
> Médio

**[S4 · PricingSection.astro:170]** Dot de navegação mobile — label (`aria-label`: "Plano 3: Top", linha 169)
> Top

**[S4 · PricingSection.astro:175]** Dica de deslize (mobile)
> Deslize para ver mais planos (3 opções)

**[S4 · PricingSection.astro:252]** Rodapé informativo da seção
> 💡 Pagamento no PIX com 5% de desconto · Ativação imediata da conta

### Componente do card de plano (src/components/pricing/PlanCard.astro)

**[S4 · PlanCard.astro:29]** Preço renderizado — template no código (no ciclo mensal resulta em "R$ 57/mês" … "R$ 447/mês")
> R$ ${Number.isInteger(plan.monthly) ? `R$ ${plan.monthly}/mês` : `R$ ${plan.monthly.toFixed(2).replace('.', ',')}/mês`}

**[S4 · PlanCard.astro:31]** Nota padrão exibida abaixo do preço
> Cobrado mensalmente

### Conteúdo dinâmico — preços por ciclo (src/scripts/home-interactions.ts)

> Textos trocados pelo JavaScript conforme o ciclo de cobrança selecionado. Cada entrada mostra preço + nota exibidos no card.

**[S4 · home-interactions.ts:79]** Preço · prof_basico · ciclo mensal
> R$ 57/mês
> Cobrado mensalmente

**[S4 · home-interactions.ts:80]** Preço · prof_basico · ciclo trimestral
> R$ 47/mês
> Total R$ 141 por trimestre

**[S4 · home-interactions.ts:81]** Preço · prof_basico · ciclo anual
> R$ 37/mês
> Total R$ 444 por ano

**[S4 · home-interactions.ts:84]** Preço · prof_medio · ciclo mensal
> R$ 87/mês
> Cobrado mensalmente

**[S4 · home-interactions.ts:85]** Preço · prof_medio · ciclo trimestral
> R$ 67/mês
> Total R$ 201 por trimestre

**[S4 · home-interactions.ts:86]** Preço · prof_medio · ciclo anual
> R$ 57/mês
> Total R$ 684 por ano

**[S4 · home-interactions.ts:89]** Preço · prof_top · ciclo mensal
> R$ 127/mês
> Cobrado mensalmente

**[S4 · home-interactions.ts:90]** Preço · prof_top · ciclo trimestral
> R$ 107/mês
> Total R$ 321 por trimestre

**[S4 · home-interactions.ts:91]** Preço · prof_top · ciclo anual
> R$ 87/mês
> Total R$ 1.044 por ano

**[S4 · home-interactions.ts:94]** Preço · clinica_basico · ciclo mensal
> R$ 147/mês
> Cobrado mensalmente

**[S4 · home-interactions.ts:95]** Preço · clinica_basico · ciclo trimestral
> R$ 127/mês
> Total R$ 381 por trimestre

**[S4 · home-interactions.ts:96]** Preço · clinica_basico · ciclo anual
> R$ 97/mês
> Total R$ 1.164 por ano

**[S4 · home-interactions.ts:99]** Preço · clinica_medio · ciclo mensal
> R$ 267/mês
> Cobrado mensalmente

**[S4 · home-interactions.ts:100]** Preço · clinica_medio · ciclo trimestral
> R$ 227/mês
> Total R$ 681 por trimestre

**[S4 · home-interactions.ts:101]** Preço · clinica_medio · ciclo anual
> R$ 177/mês
> Total R$ 2.124 por ano

**[S4 · home-interactions.ts:104]** Preço · clinica_top · ciclo mensal
> R$ 447/mês
> Cobrado mensalmente

**[S4 · home-interactions.ts:105]** Preço · clinica_top · ciclo trimestral
> R$ 387/mês
> Total R$ 1.161 por trimestre

**[S4 · home-interactions.ts:106]** Preço · clinica_top · ciclo anual
> R$ 297/mês
> Total R$ 3.564 por ano

### Conteúdo dinâmico — estado "Grátis" (7 dias)

**[S4 · home-interactions.ts:159]** Preço exibido no card quando o ciclo "Grátis" está ativo
> 7 Dias Grátis

**[S4 · home-interactions.ts:160]** Nota exibida nesse estado
> Experimente com 20 atendimentos inclusos

**[S4 · home-interactions.ts:162]** CTA do card nesse estado
> Experimente Grátis

---

*Documento gerado a partir do código-fonte em 02/10/2026. Se os arquivos mudarem, confira as linhas dos identificadores antes de usar para edição.*
