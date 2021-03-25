import {Config} from '../app/services/config';

export const environment: Config = {
  production: true,
  apiHost: '',
  clientId: 'client_password',
  clientSecret: 'client_secret',
  tokenPath: '/o/token/',
  revokePath: '/o/revoke/',
  languages: ['en', 'ro'],
  captchaSiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
};
