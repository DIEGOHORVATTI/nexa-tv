import { RpcClient, Credentials } from './RpcClient';
import { endpoints, callbacks } from './endpoints';
import { Plano, MeioPagamento, GerarPedidoResponse } from './types';

export interface GerarPedidoInput {
  valor: string;
  planoId: string;
  tipo: string; // boleto | pix | cartao
  operadora?: string; // ex.: "assas" (Asaas)
}

export interface IRecargaApi {
  buscarPlanos(creds: Credentials): Promise<Plano[]>;
  buscarMeiosPagamento(creds: Credentials, planoId: string): Promise<MeioPagamento[]>;
  /** Passo A: lista os gateways disponíveis para o plano/tipo. */
  buscarGateways(creds: Credentials, input: GerarPedidoInput): Promise<GerarPedidoResponse>;
  /** Passo B: gera a cobrança no gateway escolhido. */
  gerarPedido(creds: Credentials, input: Required<GerarPedidoInput>): Promise<GerarPedidoResponse>;
}

/** callback: "Recarga" — catálogo, pagamento e criação de pedido. */
export class RecargaApi implements IRecargaApi {
  constructor(private readonly rpc: RpcClient) {}

  async buscarPlanos(creds: Credentials): Promise<Plano[]> {
    const r = await this.rpc.call<{ itens: Plano[] }>(
      endpoints.recarga,
      callbacks.recarga,
      'Buscar Planos All',
      {},
      creds,
    );
    return r.itens ?? [];
  }

  async buscarMeiosPagamento(creds: Credentials, planoId: string): Promise<MeioPagamento[]> {
    const r = await this.rpc.call<{ itens: MeioPagamento[] }>(
      endpoints.recarga,
      callbacks.recarga,
      'Buscar Meios de Pagamento',
      { plano_id: planoId },
      creds,
    );
    return r.itens ?? [];
  }

  buscarGateways(creds: Credentials, input: GerarPedidoInput): Promise<GerarPedidoResponse> {
    return this.rpc.call<GerarPedidoResponse>(
      endpoints.recarga,
      callbacks.recarga,
      'Gerar Pedido',
      { getPagamentos: true, valor: input.valor, plano_id: input.planoId, tipo: input.tipo },
      creds,
    );
  }

  gerarPedido(creds: Credentials, input: Required<GerarPedidoInput>): Promise<GerarPedidoResponse> {
    return this.rpc.call<GerarPedidoResponse>(
      endpoints.recarga,
      callbacks.recarga,
      'Gerar Pedido',
      { valor: input.valor, plano_id: input.planoId, tipo: input.tipo, operadora: input.operadora },
      creds,
    );
  }
}
