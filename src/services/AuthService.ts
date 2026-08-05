import { IAuthApi, DadosCadastro } from '../api/AuthApi';
import { ISessionStore, Session } from './SessionStore';

/** Fornece o token FCM (Firebase). Injetado para não acoplar o serviço ao Firebase. */
export interface ITokenProvider {
  getToken(): Promise<string | undefined>;
}

export class AuthError extends Error {}

/**
 * Regra de negócio de autenticação, fiel ao backend real:
 * login retorna `userLogado` (client_id + client_token) → vira a sessão.
 * Cadastro em 3 passos: createAccount → confirmCode → finishAccount.
 */
export class AuthService {
  constructor(
    private readonly api: IAuthApi,
    private readonly session: ISessionStore,
    private readonly tokens: ITokenProvider,
  ) {}

  async login(email: string, senha: string): Promise<Session> {
    if (!email.trim() || !senha) throw new AuthError('Informe e-mail e senha.');

    const fcm = await this.tokens.getToken();
    const res = await this.api.login(email.trim(), senha, fcm);

    if (!res.userLogado) {
      throw new AuthError(res.trigger?.text ?? 'Erro ao conectar');
    }

    const u = res.userLogado;
    const session: Session = {
      clientId: u.client_id,
      clientToken: u.client_token,
      nome: u.client_name,
      email: u.client_email,
    };
    await this.session.save(session);
    return session;
  }

  /**
   * Cadastro completo (3 passos do backend). O código de confirmação é o mesmo
   * `code` retornado no passo 1 (sem o prefixo "TV-").
   */
  async cadastrar(dados: DadosCadastro, senha: string): Promise<void> {
    const created = await this.api.createAccount(dados);
    if (!created.success || !created.code) throw new AuthError('Erro ao criar conta');

    const code = created.code.replace(/^TV-/, '');
    const confirmed = await this.api.confirmCode(dados, code);
    if (!confirmed.session_token) throw new AuthError('Código inválido');

    const finished = await this.api.finishAccount(dados, code, confirmed.session_token, senha);
    if (!finished.success) throw new AuthError(finished.trigger?.text ?? 'Erro ao finalizar cadastro');
  }

  /** Passo 1 da recuperação de senha: retorna os métodos (e-mail mascarado). */
  async recuperarSenha(email: string): Promise<string> {
    if (!email.trim()) throw new AuthError('Digite seu e-mail');
    const res = await this.api.recoveryPass(email.trim());
    const m = res.methods?.[0];
    if (!m) throw new AuthError('Nenhum método de recuperação encontrado');
    return m.text; // e-mail mascarado
  }

  current(): Promise<Session | null> {
    return this.session.load();
  }

  async logout(): Promise<void> {
    await this.session.clear();
  }
}
