import type { IHttpClient } from './api/HttpClient';
import type { IAuthApi } from './api/AuthApi';
import type { IRecargaApi } from './api/RecargaApi';
import type { IPedidosApi } from './api/PedidosApi';
import type { ISyncApi } from './api/SyncApi';
import type { IUsersApi } from './api/UsersApi';
import type { ISessionStore } from './services/SessionStore';
import type { AuthService } from './services/AuthService';

/**
 * Contrato dos serviços que as telas consomem (ISP). Fiel ao backend real
 * (RPC callback/callback_action) — ver API_REAL.md.
 */
export interface AppServices {
  http: IHttpClient;
  session: ISessionStore;
  authApi: IAuthApi;
  recargaApi: IRecargaApi;
  pedidosApi: IPedidosApi;
  syncApi: ISyncApi;
  usersApi: IUsersApi;
  authService: AuthService;
}
