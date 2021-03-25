import {OAuthService} from 'ngx-oauth';
import {AccountService} from '../api/account.service';
import {catchError, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {User, UserCreationForm} from '../models';
import {Injectable} from '@angular/core';
import {ConfigService} from '../config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: Observable<User>;

  constructor(private oauthService: OAuthService,
              private accountService: AccountService,
              private config: ConfigService) {
    this.user$ = oauthService.status$.pipe(
      switchMap(() => accountService.getUser())
    );
  }

  register(form: UserCreationForm): void {
    const {email, password, captcha} = form;
    if (email && password && captcha) {
      this.accountService.addUser(form).pipe(
        catchError(err => of(this.oauthService.logout()))
      ).subscribe(user => this.oauthService.login({
        username: form.email,
        password: form.password
      }));
    }
  }
}
