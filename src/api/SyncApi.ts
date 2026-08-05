import { RpcClient, Credentials } from './RpcClient';
import { endpoints, callbacks } from './endpoints';
import { SyncResponse } from './types';

export interface ISyncApi {
  /** Sincroniza pedidos + códigos do cliente (Sinc Dados). */
  sincDados(creds: Credentials): Promise<SyncResponse>;
}

/** callback: "Sync". */
export class SyncApi implements ISyncApi {
  constructor(private readonly rpc: RpcClient) {}

  sincDados(creds: Credentials): Promise<SyncResponse> {
    return this.rpc.call<SyncResponse>(endpoints.sync, callbacks.sync, 'Sinc Dados', {}, creds);
  }
}
