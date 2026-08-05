import { ITokenProvider } from './AuthService';

/**
 * Stub de token FCM para Expo Go (sem firebase nativo).
 * O backend aceita client_token_app vazio no login. Para push real,
 * usar expo-notifications num dev build e injetar o token aqui.
 */
export class FcmTokenProvider implements ITokenProvider {
  async getToken(): Promise<string | undefined> {
    return undefined;
  }
}
