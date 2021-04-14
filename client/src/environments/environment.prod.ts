import {Config} from '../app/services/config';
import {OAuthType} from 'ngx-oauth';

export const environment: Config = {
  production: true,
  apiHost: '',
  grantType: OAuthType.RESOURCE,
  clientId: 'client_password',
  clientSecret: 'client_secret',
  scope: 'openid',
  tokenPath: '/o/token/',
  revokePath: '/o/revoke/',
  languages: ['en', 'ro'],
  captchaSiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
};
