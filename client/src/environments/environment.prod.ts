import {Config} from '../app/services/config';
import {OAuthType} from 'ngx-oauth';

export const environment: Config = {
  production: true,
  apiHost: '',
  authHost: '',
  grantType: OAuthType.RESOURCE,
  clientId: 'client_password',
  clientSecret: 'client_secret',
  scope: 'openid',
  codeVerifier: 'M00AeaRfwOkpwQp8SK-8K-hHvPYu6OKgj1aCUOb6eSMcSZr2',
  tokenPath: '/o/token/',
  revokePath: '/o/revoke/',
  languages: ['en', 'ro'],
  captchaSiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
};
