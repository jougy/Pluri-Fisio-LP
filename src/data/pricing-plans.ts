// pricing-plans.ts - Dados tipados dos planos, ciclos de faturamento e enterprise

export interface Cycle {
  id: string;
  label: string;
  note?: string;
}

export interface PlanFeature {
  text: string;
  bold: boolean;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  features: PlanFeature[];
  cta: string;
  featured: boolean;
  audience: "prof" | "clinic";
  badge?: string;
  highlightDifference?: string;
}

// 4 opções de ciclo: Grátis (7 dias), Mensal, Trimestral, Anual
export const BILLING_CYCLES: Cycle[] = [
  { id: "free", label: "Grátis", note: "7 dias" },
  { id: "mensal", label: "Mensal" },
  { id: "trimestral", label: "Trimestral", note: "-15%" },
  { id: "anual", label: "Anual", note: "-35% OFF" },
];

export const PROF_PLANS: Plan[] = [
  {
    id: "prof_basico",
    name: "Básico",
    tagline: "Profissional autônomo iniciando consultório",
    monthly: 57,
    highlightDifference: "1 acesso individual + 2 formulários",
    features: [
      { text: "1 acesso simultâneo individual", bold: true },
      { text: "1 formulário universal + 1 ficha complementar", bold: true },
      { text: "Pacientes e atendimentos ilimitados", bold: false },
      { text: "Prontuário eletrônico & evolução rápida", bold: false },
      { text: "Duplicação rápida: repete o atendimento anterior em 1 toque", bold: false },
      { text: "Agenda com envio de mensagens no WhatsApp", bold: false },
      { text: "Consultoria de implantação VIP de lançamento inclusa", bold: true },
    ],
    cta: "Escolher Básico",
    featured: false,
    audience: "prof",
  },
  {
    id: "prof_medio",
    name: "Médio",
    tagline: "Alta demanda e fichas personalizadas",
    monthly: 87,
    highlightDifference: "Formulários e fichas ilimitadas + Portabilidade",
    features: [
      { text: "1 acesso simultâneo individual", bold: false },
      { text: "Formulários e fichas 100% ilimitadas e personalizáveis", bold: true },
      { text: "Seu histórico vai com você mesmo se mudar de consultório", bold: true },
      { text: "Controle financeiro de pagamentos e pacotes de sessões", bold: true },
      { text: "Pacientes e atendimentos ilimitados", bold: false },
      { text: "Todos os recursos clínicos e duplicação em 1 toque", bold: false },
      { text: "Consultoria de implantação VIP de lançamento inclusa", bold: true },
    ],
    cta: "Escolher Médio",
    featured: true,
    audience: "prof",
    badge: "Mais Popular",
  },
  {
    id: "prof_top",
    name: "Top",
    tagline: "Máxima autonomia e apoio de secretária",
    monthly: 127,
    highlightDifference: "2 acessos simultâneos (você + secretária) + Lembretes automáticos",
    features: [
      { text: "2 acessos simultâneos (você + secretária ou assistente)", bold: true },
      { text: "Lembretes automáticos de agendamento por WhatsApp", bold: true },
      { text: "Recibos e relatórios de receitas automáticos", bold: true },
      { text: "Suporte e atendimento prioritário direto", bold: true },
      { text: "Pacientes e atendimentos ilimitados", bold: false },
      { text: "Todos os recursos do plano Médio inclusos", bold: false },
      { text: "Consultoria de implantação VIP de lançamento inclusa", bold: true },
    ],
    cta: "Escolher Top",
    featured: false,
    audience: "prof",
  },
];

export const CLINIC_PLANS: Plan[] = [
  {
    id: "clinica_basico",
    name: "Básico",
    tagline: "Consultórios e salas compartilhadas",
    monthly: 147,
    highlightDifference: "2 acessos simultâneos ao mesmo tempo",
    features: [
      { text: "2 acessos simultâneos ao mesmo tempo", bold: true },
      { text: "Profissionais e colaboradores ilimitados para cadastrar", bold: true },
      { text: "Dono da clínica como administrador principal absoluto", bold: false },
      { text: "Permissões de acesso padrão e seguras para cada função", bold: false },
      { text: "Agendas compartilhadas por salas e macas", bold: false },
      { text: "Digitalização das suas fichas de papel de graça", bold: true },
      { text: "Consultoria de implantação VIP de lançamento inclusa", bold: true },
    ],
    cta: "Escolher Básico",
    featured: false,
    audience: "clinic",
  },
  {
    id: "clinica_medio",
    name: "Médio",
    tagline: "Clínicas consolidadas com equipe",
    monthly: 267,
    highlightDifference: "4 acessos simultâneos + Divisão de repasses",
    features: [
      { text: "4 acessos simultâneos ao mesmo tempo", bold: true },
      { text: "Controle automático de repasses e divisão de atendimentos", bold: true },
      { text: "Permissões 100% editáveis por função e membro da equipe", bold: true },
      { text: "Profissionais e colaboradores ilimitados para cadastrar", bold: false },
      { text: "Formulários e fichas personalizáveis para toda a clínica", bold: false },
      { text: "Dono no topo com controle total de segurança", bold: false },
      { text: "Consultoria de implantação VIP de lançamento inclusa", bold: true },
    ],
    cta: "Escolher Médio",
    featured: true,
    audience: "clinic",
    badge: "Recomendado",
  },
  {
    id: "clinica_top",
    name: "Top",
    tagline: "Grandes clínicas e alta rotatividade",
    monthly: 447,
    highlightDifference: "8 acessos simultâneos + Trilha de auditoria",
    features: [
      { text: "8 acessos simultâneos ao mesmo tempo", bold: true },
      { text: "Histórico completo e trilha de quem acessou cada prontuário", bold: true },
      { text: "Gestão integrada de várias salas, macas e especialidades", bold: true },
      { text: "Personalização total de níveis de hierarquia da equipe", bold: true },
      { text: "Profissionais e colaboradores ilimitados para cadastrar", bold: false },
      { text: "Controle total sobre toda a estrutura clínica", bold: false },
      { text: "Consultoria de implantação VIP de lançamento inclusa", bold: true },
    ],
    cta: "Escolher Top",
    featured: false,
    audience: "clinic",
  },
];
