// workflow-steps.ts - Dados tipados para as etapas e recursos clínicos com sanfona/accordion
export interface WorkflowStep {
  step: string;
  title: string;
  summary: string;
  icon: string;
  badge?: string;
  details: {
    highlight: string;
    description: string;
    chips?: string[];
  };
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "Auto-cadastro",
    summary: "O paciente preenche a ficha no celular antes da sessão.",
    icon: "user-plus",
    badge: "Agilidade",
    details: {
      highlight: "Economize até 15 minutos na recepção e maca",
      description: "O paciente recebe um link simples no WhatsApp, confirma os dados cadastrais e preenche o histórico preliminar direto no smartphone antes mesmo de entrar no consultório.",
      chips: ["Link no WhatsApp", "Zero papel na recepção", "Validação automática"],
    },
  },
  {
    step: "02",
    title: "Agenda com Status Visual",
    summary: "Relógio de 4 cores e status de recepção em tempo real.",
    icon: "calendar",
    badge: "Semiótica",
    details: {
      highlight: "Bateu o olho, sabe na hora o status da consulta",
      description: "Muda de cor conforme o momento do paciente: Verde (Hoje), Azul (Futuro), Laranja (Chegou na recepção) e Vermelho (Em atraso). Você nunca mais precisa interromper atendimentos para checar a recepção.",
      chips: ["4 Cores dinâmicas", "Recorrência semanal (D S T Q Q S S)", "Sincronização instantânea"],
    },
  },
  {
    step: "03",
    title: "Anamnese No-Code",
    summary: "Editor visual de blocos ou modelos prontos por especialidade.",
    icon: "file-text",
    badge: "Personalizável",
    details: {
      highlight: "Crie fichas e réguas de avaliação sem programador",
      description: "Construa formulários com blocos de arrastar e soltar, escalas visuais de dor (EVA), mapas corporais e réguas numéricas sob medida para Fisioterapia Traumato-ortopédica, Neuro, Respiratória, Pélvica ou Pilates.",
      chips: ["Arrastar e soltar", "Escalas e réguas visuais", "Biblioteca pronta"],
    },
  },
  {
    step: "04",
    title: "Tratamentos & Protocolos",
    summary: "Prescrição ágil ao lado da maca sem telas poluídas.",
    icon: "layers",
    badge: "Eficiência",
    details: {
      highlight: "Condutas terapêuticas em poucos toques",
      description: "Prescreva exercícios, parâmetros de eletroterapia e ciclos de reabilitação com tags coloridas por linha de cuidado (Coluna, Joelho, Ombro, Liberação Miofascial). Focado na velocidade real da maca.",
      chips: ["Tags por linha de cuidado", "Parâmetros rápidos", "Zero telas poluídas"],
    },
  },
  {
    step: "05",
    title: "Pagamentos & Símbolo $",
    summary: "Extrato com um clique, pacotes e controle financeiro integrado.",
    icon: "credit-card",
    badge: "Financeiro",
    details: {
      highlight: "Controle financeiro consolidado no card do paciente",
      description: "Um clique no símbolo '$' mostra se a sessão está Quitada (Verde), Pendente (Laranja), Em Débito (Vermelho) ou Com Crédito (Azul). Gerencie pacotes de sessões com dedução automática e recibos ágeis.",
      chips: ["Símbolo $ com 4 cores", "Dedução automática de pacote", "Emissão rápida de recibos"],
    },
  },
  {
    step: "06",
    title: "Evolução em 1 Toque",
    summary: "Duplicação ultra-rápida e histórico com respaldo LGPD.",
    icon: "trending-up",
    badge: "Duplicação",
    details: {
      highlight: "Economize até 1h30 por dia: replique em 30 segundos",
      description: "Com a 'Duplicação Rápida', o sistema puxa toda a conduta da sessão anterior em 1 toque. Você só anota a evolução real do dia. Inclui carimbo de tempo inviolável, segurança LGPD e liberdade multiclínica.",
      chips: ["Duplicação em 1 toque", "Carimbo de tempo LGPD", "Portfólio fica com você"],
    },
  },
];
