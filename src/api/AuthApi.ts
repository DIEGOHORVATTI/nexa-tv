import { RpcClient } from './RpcClient';
import { endpoints, callbacks } from './endpoints';
import {
  LoginResponse,
  CreateAccountResponse,
  ConfirmCodeResponse,
  TriggerResponse,
  RecoveryMethod,
} from './types';

export interface DadosCadastro {
  client_name: string;
  client_email: string;
  client_document: string;
  client_cell: string;
}

export interface IAuthApi {
  dadosSuporte(): Promise<{ item: Record<string, string> }>;
  login(email: string, senha: string, fcmToken?: string): Promise<LoginResponse>;
  createAccount(d: DadosCadastro): Promise<CreateAccountResponse>;
  confirmCode(d: DadosCadastro, code: string): Promise<ConfirmCodeResponse>;
  finishAccount(
    d: DadosCadastro,
    code: string,
    sessionToken: string,
    senha: string,
  ): Promise<TriggerResponse>;
  /** Passo 1 da recuperação: retorna os métodos disponíveis (e-mail mascarado). */
  recoveryPass(email: string): Promise<{ methods: RecoveryMethod[] }>;
}

/** callback: "Logar" — autenticação e cadastro. */
export class AuthApi implements IAuthApi {
  constructor(private readonly rpc: RpcClient) {}

  dadosSuporte() {
    return this.rpc.call<{ item: Record<string, string> }>(
      endpoints.login,
      callbacks.logar,
      'Dados Suporte',
    );
  }

  login(email: string, senha: string, fcmToken?: string): Promise<LoginResponse> {
    return this.rpc.call<LoginResponse>(endpoints.login, callbacks.logar, 'Logar Usuário', {
      client_email: email,
      client_password: senha,
      client_token_app: fcmToken ?? '',
    });
  }

  createAccount(d: DadosCadastro): Promise<CreateAccountResponse> {
    return this.rpc.call<CreateAccountResponse>(endpoints.login, callbacks.logar, 'Create Account', {
      ...d,
    });
  }

  confirmCode(d: DadosCadastro, code: string): Promise<ConfirmCodeResponse> {
    return this.rpc.call<ConfirmCodeResponse>(endpoints.login, callbacks.logar, 'Confirm Code', {
      ...d,
      client_code: code,
      type: 'newUser',
    });
  }

  finishAccount(
    d: DadosCadastro,
    code: string,
    sessionToken: string,
    senha: string,
  ): Promise<TriggerResponse> {
    return this.rpc.call<TriggerResponse>(endpoints.login, callbacks.logar, 'Finish Account', {
      ...d,
      client_code: code,
      session_token: sessionToken,
      client_password: senha,
      client_password_confirm: senha,
      type: 'newUser',
    });
  }

  recoveryPass(email: string): Promise<{ methods: RecoveryMethod[] }> {
    return this.rpc.call<{ methods: RecoveryMethod[] }>(
      endpoints.login,
      callbacks.logar,
      'Recovery Pass',
      { client_email: email },
    );
  }
}
