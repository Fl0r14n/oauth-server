import {Component} from '@angular/core';
import {OAuthService, OAuthStatus} from 'ngx-oauth';
import {Observable} from 'rxjs';
import {UserService} from './services/facades/user.service';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <header>
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand">OAuth Demo</a>
        <ul class="nav">
          <li class="nav-item">
            <oauth-login [profileName$]="profileName$"
                         [i18n]="i18n"
                         [scope]="scope"
                         [(state)]="state"></oauth-login>
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

  scope = 'read';
  state = 'dummy_state'

  constructor(private oauthService: OAuthService,
              private userService: UserService) {
    this.status$ = this.oauthService.status$;
  }

  get profileName$(): Observable<string> {
    return this.userService.user$.pipe(
      map(u => u.email)
    )
  }
}
