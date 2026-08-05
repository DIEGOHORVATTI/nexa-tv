import { IHttpClient } from './HttpClient';
import { Credentials } from './RpcClient';
import { endpoints } from './endpoints';
import { ProfileFields, UpdateProfileResponse } from './types';

export interface IUsersApi {
  updateProfile(creds: Credentials, fields: ProfileFields): Promise<UpdateProfileResponse>;
}

/**
 * callback: "Usuários" (users/users.php). Padrão DIFERENTE do RPC JSON:
 * auth + dispatch vão na QUERY STRING e o corpo é multipart (aceita foto).
 */
export class UsersApi implements IUsersApi {
  constructor(private readonly http: IHttpClient) {}

  updateProfile(creds: Credentials, fields: ProfileFields): Promise<UpdateProfileResponse> {
    return this.http.postMultipart<UpdateProfileResponse>(
      endpoints.users,
      {
        client_id: creds.clientId,
        client_token: creds.clientToken,
        callback: 'Usuários',
        callback_action: 'Update My Account',
      },
      {
        client_name: fields.client_name,
        client_document: fields.client_document,
        client_cell: fields.client_cell,
        client_datebirth: fields.client_datebirth ?? '',
        client_telephone: fields.client_telephone ?? '',
      },
    );
  }
}
