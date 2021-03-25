import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest
} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {LangChangeEvent} from '@ngx-translate/core/lib/translate.service';
import {skip} from 'rxjs/operators';
import {ConfigService} from '../config';

@Injectable({
  providedIn: 'root'
})
export class LocaleService {

  languages$: ReplaySubject<string[]> = new ReplaySubject(1);
  language$: Observable<LangChangeEvent>;
  ignorePaths: RegExp[] = [];

  constructor(private configService: ConfigService,
              private i18nService: TranslateService) {
    this.i18nService.setDefaultLang('en');
    const browserLang = this.i18nService.getBrowserLang();
    const {languages, tokenPath, revokePath} = configService.get();
    if (tokenPath) {
      this.ignorePaths.push(new RegExp(tokenPath));
    }
    if (revokePath) {
      this.ignorePaths.push(new RegExp(revokePath));
    }
    if (languages) {
      this.languages$.next(languages);
      this.i18nService.addLangs(languages);
      this.i18nService.use(languages.indexOf(browserLang) > -1 ? browserLang : 'en');
    } else {
      this.i18nService.use('en');
    }
    this.language$ = this.i18nService.onLangChange.pipe(skip(1)); // ignore first event
  }

  get language(): string {
    return this.i18nService.currentLang;
  }

  set language(language: string) {
    this.i18nService.use(language);
  }
}

@Injectable({
  providedIn: 'root'
})
export class LocaleInterceptor implements HttpInterceptor {

  constructor(private localeService: LocaleService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.localeService && !this.isPathExcepted(req)) {
      const {language} = this.localeService;
      if (language) {
        let params = new HttpParams({fromString: req.params.toString()});
        params = params.append('lang', language);
        req = req.clone({
          params
        });
      }
    }
    return next.handle(req);
  }

  private isPathExcepted(req: HttpRequest<any>): boolean {
    for (const ignorePath of this.localeService.ignorePaths) {
      try {
        if (req.url.match(ignorePath)) {
          return true;
        }
      } catch (err) {
      }
    }
    return false;
  }
}
