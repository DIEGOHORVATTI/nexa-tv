import { env } from './config/env';
import { FetchHttpClient } from './api/HttpClient';
import { RpcClient } from './api/RpcClient';
import { AuthApi } from './api/AuthApi';
import { RecargaApi } from './api/RecargaApi';
import { PedidosApi } from './api/PedidosApi';
import { SyncApi } from './api/SyncApi';
import { UsersApi } from './api/UsersApi';
import { AsyncStorageSessionStore } from './services/SessionStore';
import { AuthService, ITokenProvider } from './services/AuthService';
import type { AppServices } from './AppServices';

/**
 * Composition Root: único lugar que conhece as implementações concretas.
 * O resto do app depende só das interfaces em AppServices.
 */
function buildContainer(tokens: ITokenProvider): AppServices {
  const http = new FetchHttpClient(env.baseUrl);
  const rpc = new RpcClient(http);
  const authApi = new AuthApi(rpc);
  const session = new AsyncStorageSessionStore();

  return {
    http,
    session,
    authApi,
    recargaApi: new RecargaApi(rpc),
    pedidosApi: new PedidosApi(rpc),
    syncApi: new SyncApi(rpc),
    usersApi: new UsersApi(http),
    authService: new AuthService(authApi, session, tokens),
  };
}

export type Container = AppServices;
export { buildContainer };
