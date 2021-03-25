import {RequestOptions, RestClient} from '../rest';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../config';
import {User, UserChangeForm, UserCreationForm} from '../models';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends RestClient {

  constructor(http: HttpClient,
              configService: ConfigService) {
    super(http, configService);
  }

  getEndpoint(options?: RequestOptions): string {
    const {apiHost} = this.configService.get();
    return `${apiHost}/account`;
  }

  getUser(): Observable<User> {
    return this.get('current/');
  }

  addUser(form: UserCreationForm): Observable<User> {
    return this.postAt('register/', this.toHttpParams(form));
  }

  setUser(form: UserChangeForm): Observable<User> {
    return this.postAt('change/', this.toHttpParams(form));
  }
}
