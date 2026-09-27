// workflow-steps.ts - Dados tipados para as 6 etapas clínicas da Pluri Fisio

export interface WorkflowStep {
  step: string;
  title: string;
  text: string;
  icon: string; // identificador semântico para renderização de SVG
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "Auto-cadastro",
    text: "O paciente preenche a ficha no celular antes de chegar, poupando tempo na maca.",
    icon: "user-plus",
  },
  {
    step: "02",
    title: "Agenda Ágil",
    text: "Marcação rápida com visão clara de quem chegou, aguarda ou está em atraso.",
    icon: "calendar",
  },
  {
    step: "03",
    title: "Anamnese Sob Medida",
    text: "Crie formulários em blocos visuais ou use modelos prontos da nossa biblioteca.",
    icon: "file-text",
  },
  {
    step: "04",
    title: "Tratamento Facilitado",
    text: "Prescreva condutas, exercícios e ciclos terapêuticos de forma ágil ao lado da maca.",
    icon: "layers",
  },
  {
    step: "05",
    title: "Pagamentos & Planos",
    text: "Sessões avulsas, pacotes com dedução automática e controle financeiro em dia.",
    icon: "credit-card",
  },
  {
    step: "06",
    title: "Evolução & Métricas",
    text: "Evolua rapidamente puxando a última sessão e acompanhe a linha do tempo e estatísticas.",
    icon: "trending-up",
  },
];
