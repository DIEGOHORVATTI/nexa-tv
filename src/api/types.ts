/** Tipos das respostas reais do backend (ver API_REAL.md). */

/** Envelope de mensagem/erro exibido ao usuário. */
export interface Trigger {
  title: string;
  text: string;
  type: 'success' | 'warn' | 'error';
}

/** Usuário retornado no login. */
export interface UserLogado {
  client_id: string;
  client_name: string;
  client_token: string;
  client_email: string;
  client_document: string | null;
  client_cell: string | null;
  client_telephone: string | null;
  client_datebirth: string | null;
  client_thumb: string | null;
}

export interface LoginResponse {
  trigger?: Trigger;
  userLogado?: UserLogado;
}

export interface CreateAccountResponse {
  success: boolean;
  code?: string;
}

export interface ConfirmCodeResponse {
  session_token: string;
}

export interface TriggerResponse {
  trigger?: Trigger;
  success?: boolean;
}

/** Plano do catálogo (Recarga → Buscar Planos All). */
export interface Plano {
  pdt_id: string;
  nome: string;
  capa: string | null;
  venda: string;
  category_id: string;
  descricao?: string;
}

/** Meio de pagamento (boleto/pix/cartão). */
export interface MeioPagamento {
  nome: string;
  name: string;
  obs?: string;
  foto?: string;
  foto2?: string;
}

/** Gateway (ex.: Asaas). */
export interface EmpresaPagamento {
  nome: string;
  name: string;
  foto?: string;
}

/** Pedido persistido no backend. */
export interface Pedido {
  id: string;
  client_id: string;
  plano_id: string;
  tipo: string;
  operadora: string;
  valor: string;
  status: string;
  data: string;
  PaymentId?: string | null;
  boleto_link?: string | null;
  cartao_numero?: string | null;
  cartao_titular?: string | null;
  cartao_validade?: string | null;
  cartao_bandeira?: string | null;
  foto?: string | null;
}

/** Resposta de Gerar Pedido (cobrança criada no gateway). */
export interface GerarPedidoResponse {
  rest?: Record<string, unknown>; // objeto payment do Asaas
  pedido?: Pedido;
  falha?: { text: string; icon?: string; background?: string };
  empresas_pagamentos?: EmpresaPagamento[];
}

export interface SyncResponse {
  pedidos: Pedido[];
  pedidos_codigos: unknown[];
  success: boolean;
}

/** Campos editáveis do perfil (users.php → Update My Account). */
export interface ProfileFields {
  client_name: string;
  client_document: string;
  client_cell: string;
  client_datebirth?: string;
  client_telephone?: string;
}

export interface UpdateProfileResponse {
  item?: ProfileFields;
  trigger?: Trigger;
}

/** Método de recuperação de senha (Recovery Pass). */
export interface RecoveryMethod {
  method: string; // "E-mail"
  value: string;
  text: string; // mascarado
  icon: string;
  client_name: string;
}
