/**
 * Contrato HTTP (DIP): serviços dependem desta interface, não do fetch.
 * O backend TVE recebe um corpo JSON com Content-Type form-urlencoded
 * (lê php://input) — postJson replica exatamente isso.
 */
export type Json = Record<string, unknown>;

/** Arquivo para upload multipart (formato RN em FormData). */
export interface UploadFile {
  field: string;
  uri: string;
  name: string;
  type: string;
}

export interface IHttpClient {
  /** POST com corpo JSON (contrato RPC do backend). */
  postJson<T>(path: string, body: Json): Promise<T>;
  /** GET com querystring. */
  get<T>(path: string, query?: Record<string, string | number>): Promise<T>;
  /**
   * POST multipart/form-data com auth/dispatch na QUERY STRING.
   * Usado pelo update de perfil (users.php) — aceita foto opcional.
   */
  postMultipart<T>(
    path: string,
    query: Record<string, string>,
    fields: Record<string, string>,
    files?: UploadFile[],
  ): Promise<T>;
}

function withQuery(path: string, query: Record<string, string | number>): string {
  const qs = Object.entries(query)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&');
  return qs ? `${path}?${qs}` : path;
}

export class HttpError extends Error {
  constructor(readonly status: number, readonly path: string) {
    super(`HTTP ${status} em ${path}`);
    this.name = 'HttpError';
  }
}

export class FetchHttpClient implements IHttpClient {
  constructor(
    private readonly baseUrl: string,
    private readonly fetchFn: typeof fetch = fetch,
  ) {}

  async postJson<T>(path: string, body: Json): Promise<T> {
    // Fiel ao app: JSON no corpo, mas header form-urlencoded.
    return this.request<T>(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: JSON.stringify(body),
    });
  }

  async get<T>(path: string, query: Record<string, string | number> = {}): Promise<T> {
    return this.request<T>(withQuery(path, query), { method: 'GET' });
  }

  async postMultipart<T>(
    path: string,
    query: Record<string, string>,
    fields: Record<string, string>,
    files: UploadFile[] = [],
  ): Promise<T> {
    const form = new FormData();
    for (const [k, v] of Object.entries(fields)) form.append(k, v);
    for (const f of files) {
      form.append(f.field, { uri: f.uri, name: f.name, type: f.type } as unknown as Blob);
    }
    return this.request<T>(withQuery(path, query), { method: 'POST', body: form });
  }

  private async request<T>(path: string, init: RequestInit): Promise<T> {
    const res = await this.fetchFn(`${this.baseUrl}${path}`, init);
    if (!res.ok) throw new HttpError(res.status, path);
    const text = await res.text();
    return (text ? JSON.parse(text) : null) as T;
  }
}
