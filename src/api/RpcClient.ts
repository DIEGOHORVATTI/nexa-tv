import { IHttpClient, Json } from './HttpClient';

/** Credenciais de sessão enviadas nas chamadas autenticadas. */
export interface Credentials {
  clientId: string;
  clientToken: string;
}

/**
 * Cliente RPC do backend TVE: monta o corpo {callback, callback_action, ...}
 * e injeta client_id/client_token quando autenticado.
 */
export class RpcClient {
  constructor(private readonly http: IHttpClient) {}

  call<T>(
    path: string,
    callback: string,
    action: string,
    params: Json = {},
    creds?: Credentials,
  ): Promise<T> {
    const body: Json = {
      callback,
      callback_action: action,
      ...(creds ? { client_id: creds.clientId, client_token: creds.clientToken } : {}),
      ...params,
    };
    return this.http.postJson<T>(path, body);
  }
}
