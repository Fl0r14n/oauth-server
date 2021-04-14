import {Component} from '@angular/core';
import {OAuthService, OAuthStatus} from 'ngx-oauth';
import {Observable} from 'rxjs';
import {UserService} from './services/facades/user.service';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand">OAuth Demo</a>
        <ul class="nav">
          <li class="nav-item">
            <oauth-login [profileName$]="profileName$"
                         [i18n]="i18n"></oauth-login>
          </li>
        </ul>
      </nav>
      <div class="alert alert-info text-center font-weight-bold"
           *ngIf="status$ | async as status">{{status}}</div>
    </header>
    <div class="container">
      <content-resource></content-resource>
    </div>
    <footer></footer>
  `
})
export class AppComponent {

  status$: Observable<OAuthStatus>;
  i18n = {
    username: 'Username'
  };

  constructor(private oauthService: OAuthService,
              private userService: UserService) {
    this.status$ = this.oauthService.status$;
  }

  get profileName$(): Observable<string> {
    return this.status$.pipe(
      filter(s => s === OAuthStatus.AUTHORIZED),
      map(() => this.oauthService.token.id_token),
      filter(t => !!t),
      map(t => JSON.parse(atob(t.split('.')[1]))),
      map(t => t.name || t.username || t.email || t.sub)
    );
  }
}
