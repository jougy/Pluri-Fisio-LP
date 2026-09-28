// pricing-plans.ts - Dados tipados dos planos, ciclos de faturamento e enterprise

export interface Cycle {
  id: string;
  label: string;
  note?: string;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  monthly: number;
  features: string[];
  cta: string;
  featured: boolean;
  audience: "prof" | "clinic";
  badge?: string;
}

// 3 opções de frequência compactas e claras (cabe perfeitamente no mobile)
export const BILLING_CYCLES: Cycle[] = [
  { id: "mensal", label: "Mensal" },
  { id: "trimestral", label: "Trimestral", note: "-10%" },
  { id: "anual", label: "Anual", note: "-25% OFF" },
];

export const PROF_PLANS: Plan[] = [
  {
    id: "prof-basico",
    name: "Básico",
    tagline: "Profissional autônomo iniciando consultório",
    monthly: 39.99,
    features: [
      "1 acesso simultâneo individual",
      "Pacientes e atendimentos ilimitados",
      "Prontuário eletrônico & evolução rápida",
      "Duplicação rápida: repete o atendimento anterior em 1 toque",
      "1 formulário bloco padrão universal + 1 ficha complementar",
      "Agenda com envio de mensagens no WhatsApp",
    ],
    cta: "Escolher Básico",
    featured: false,
    audience: "prof",
  },
  {
    id: "prof-medio",
    name: "Médio",
    tagline: "Alta demanda e fichas personalizadas",
    monthly: 59.99,
    features: [
      "1 acesso simultâneo individual",
      "Pacientes e atendimentos ilimitados",
      "Todos os recursos clínicos essenciais e duplicação rápida",
      "Formulários e fichas de avaliação ilimitadas e personalizáveis",
      "Seu histórico vai com você mesmo se mudar de consultório",
      "Controle de pagamentos e pacotes de sessões",
    ],
    cta: "Escolher Médio",
    featured: true,
    audience: "prof",
    badge: "Mais Popular",
  },
  {
    id: "prof-top",
    name: "Top",
    tagline: "Máxima autonomia e apoio de secretária",
    monthly: 89.99,
    features: [
      "2 acessos simultâneos (você + sua secretária ou assistente)",
      "Pacientes e atendimentos ilimitados",
      "Todos os recursos do plano Médio inclusos",
      "Recibos e relatórios de receitas automáticos",
      "Lembretes automáticos de agendamento por WhatsApp",
      "Atendimento e suporte prioritário",
    ],
    cta: "Escolher Top",
    featured: false,
    audience: "prof",
  },
];

export const CLINIC_PLANS: Plan[] = [
  {
    id: "clinica-basico",
    name: "Básico",
    tagline: "Consultórios e salas compartilhadas",
    monthly: 99.00,
    features: [
      "2 acessos simultâneos ao mesmo tempo",
      "Profissionais e colaboradores ilimitados para cadastrar",
      "Dono da clínica como administrador principal absoluto",
      "Permissões de acesso padrão e seguras para cada função",
      "Agendas compartilhadas por salas e macas",
      "Passamos suas fichas de papel para o sistema de graça",
    ],
    cta: "Escolher Básico",
    featured: false,
    audience: "clinic",
  },
  {
    id: "clinica-medio",
    name: "Médio",
    tagline: "Clínicas consolidadas com equipe",
    monthly: 139.00,
    features: [
      "4 acessos simultâneos ao mesmo tempo",
      "Profissionais e colaboradores ilimitados para cadastrar",
      "Dono da clínica no topo com controle total de segurança",
      "Permissões editáveis: defina exatamente o que cada pessoa pode ver e mexer",
      "Controle automático de repasses e divisão de atendimentos",
      "Formulários e fichas personalizáveis para toda a clínica",
    ],
    cta: "Escolher Médio",
    featured: true,
    audience: "clinic",
    badge: "Recomendado",
  },
  {
    id: "clinica-top",
    name: "Top",
    tagline: "Grandes clínicas e alta rotatividade",
    monthly: 199.00,
    features: [
      "8 acessos simultâneos ao mesmo tempo",
      "Profissionais e colaboradores ilimitados para cadastrar",
      "Dono com controle total sobre toda a estrutura da clínica",
      "Personalização total de cargos, níveis de hierarquia e regras de acesso",
      "Gestão integrada de várias salas e especialidades",
      "Histórico completo de quem acessou e editou cada prontuário",
    ],
    cta: "Escolher Top",
    featured: false,
    audience: "clinic",
  },
];
