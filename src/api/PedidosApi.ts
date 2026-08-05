import { RpcClient, Credentials } from './RpcClient';
import { endpoints, callbacks } from './endpoints';
import { Plano } from './types';

export interface IPedidosApi {
  /** Planos que o cliente possui (Search Plan). */
  searchPlan(creds: Credentials): Promise<Plano[]>;
}

/** callback: "Pedidos". */
export class PedidosApi implements IPedidosApi {
  constructor(private readonly rpc: RpcClient) {}

  async searchPlan(creds: Credentials): Promise<Plano[]> {
    const r = await this.rpc.call<{ planos: Record<string, Plano> }>(
      endpoints.pedidos,
      callbacks.pedidos,
      'Search Plan',
      {},
      creds,
    );
    return Object.values(r.planos ?? {});
  }
}
