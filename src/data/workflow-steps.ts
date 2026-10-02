// workflow-steps.ts - Dados tipados para as etapas e recursos clínicos com sanfona/accordion
export interface WorkflowStep {
  step: string;
  title: string;
  summary: string;
  icon: string;
  theme: string; // Cada card com uma cor/tema diferente
  accentColor: string;
  bgColor: string;
  borderColor: string;
}

export const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    step: "01",
    title: "Auto-Cadastro",
    summary: "Envie o cadastro completo para o paciente preencher antes da consulta",
    icon: "user-plus",
    theme: "card-theme-cyan",
    accentColor: "#00E5FF",
    bgColor: "linear-gradient(145deg, rgba(0, 229, 255, 0.12) 0%, rgba(14, 34, 70, 0.95) 100%)",
    borderColor: "rgba(0, 229, 255, 0.35)",
  },
  {
    step: "02",
    title: "Agendamento simples",
    summary: "Organize seus agendamentos de forma rápida pensada para facilitar seu dia a dia",
    icon: "calendar",
    theme: "card-theme-emerald",
    accentColor: "#10B981",
    bgColor: "linear-gradient(145deg, rgba(16, 185, 129, 0.12) 0%, rgba(14, 34, 70, 0.95) 100%)",
    borderColor: "rgba(16, 185, 129, 0.35)",
  },
  {
    step: "03",
    title: "Anamnese personalizavel",
    summary: "Crie suas fichas de anamnese com o melhor editor de formulários para se adaptar ao seu jeito e obtenha estatisticas automaticamente",
    icon: "file-text",
    theme: "card-theme-purple",
    accentColor: "#C084FC",
    bgColor: "linear-gradient(145deg, rgba(192, 132, 252, 0.12) 0%, rgba(14, 34, 70, 0.95) 100%)",
    borderColor: "rgba(192, 132, 252, 0.35)",
  },
  {
    step: "04",
    title: "Tratamentos Ágeis",
    summary: "Monte seus planos de tratamentos de forma rápida e dinamica sem perder tempo",
    icon: "layers",
    theme: "card-theme-amber",
    accentColor: "#F59E0B",
    bgColor: "linear-gradient(145deg, rgba(245, 158, 11, 0.12) 0%, rgba(14, 34, 70, 0.95) 100%)",
    borderColor: "rgba(245, 158, 11, 0.35)",
  },
  {
    step: "05",
    title: "Controle Financeiro",
    summary: "Estatisticas completas para te ajudar na tomada de decisões do seu negócio",
    icon: "credit-card",
    theme: "card-theme-rose",
    accentColor: "#F43F5E",
    bgColor: "linear-gradient(145deg, rgba(244, 63, 94, 0.12) 0%, rgba(14, 34, 70, 0.95) 100%)",
    borderColor: "rgba(244, 63, 94, 0.35)",
  },
  {
    step: "06",
    title: "Evolução inteligente",
    summary: "Evolua seus pacientes utilizando o último atendimento, alterando apenas o necessário, otimizando ao máximo o seu tempo",
    icon: "trending-up",
    theme: "card-theme-blue",
    accentColor: "#3B82F6",
    bgColor: "linear-gradient(145deg, rgba(59, 130, 246, 0.14) 0%, rgba(14, 34, 70, 0.95) 100%)",
    borderColor: "rgba(59, 130, 246, 0.35)",
  },
];
