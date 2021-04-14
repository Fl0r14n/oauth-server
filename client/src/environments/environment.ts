// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {Config} from '../app/services/config';
import {OAuthType} from 'ngx-oauth';

export const environment: Config = {
  production: false,
  apiHost: '',
  authHost: '',
  grantType: OAuthType.AUTHORIZATION_CODE,
  clientId: 'client_application',
  clientSecret: 'client_secret',
  scope: 'openid',
  codeVerifier: 'M00AeaRfwOkpwQp8SK-8K-hHvPYu6OKgj1aCUOb6eSMcSZr2',
  authorizePath: '/o/authorize/',
  tokenPath: '/o/token/',
  revokePath: '/o/revoke/',
  languages: ['en', 'ro'],
  captchaSiteKey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
