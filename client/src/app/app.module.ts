import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {OAuthModule} from 'ngx-oauth';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LocaleInterceptor} from './services/locale';
import {RECAPTCHA_SETTINGS} from 'ng-recaptcha';
import {environment} from '../environments/environment';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {en} from '../assets/i18n/en';
import {ro} from '../assets/i18n/ro';
import {Observable} from 'rxjs';
import {ConfigModule} from './services/config';
import {ComponentsModule} from './components';
import {ServiceWorkerModule} from '@angular/service-worker';

const {
  grantType,
  clientId,
  clientSecret,
  tokenPath,
  revokePath,
  apiHost,
  captchaSiteKey
} = environment;

export class I18nLoader implements TranslateLoader {

  lang = {
    en, ro
  };

  getTranslation(lang: string): Observable<any> {
    return new Observable<any>(subscriber => {
      subscriber.next(this.lang[lang]);
      subscriber.complete();
    });
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    OAuthModule.forRoot({
      type: grantType,
      config: {
        clientId,
        clientSecret,
        tokenPath: `${apiHost}${tokenPath}`,
        revokePath: `${apiHost}${revokePath}`
      }
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: I18nLoader
      }
    }),
    ConfigModule.forRoot(environment),
    ComponentsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useExisting: LocaleInterceptor
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: captchaSiteKey
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
