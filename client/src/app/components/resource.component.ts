import {Component} from '@angular/core';
import {OAuthService, OAuthStatus} from 'ngx-oauth';
import {map, switchMap} from 'rxjs/operators';
import {ResourceService} from '../services/api/resource.service';
import {ResourceDTO} from '../services/models';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'content-resource',
  template: `
    <div class="alert alert-info text-center font-weight-bold"
         *ngIf="resources$ | async as resources">
      <ul class="list-group">
        <li class="list-group-item" *ngFor="let resource of resources">
          {{resource.title}}
        </li>
      </ul>
    </div>
  `
})
export class ResourceComponent {

  resources$: Observable<ResourceDTO[]>;

  constructor(private oauthService: OAuthService,
              private resourceService: ResourceService) {
    this.resources$ = oauthService.status$.pipe(
      switchMap(s => s === OAuthStatus.AUTHORIZED ? resourceService.getResources().pipe(
        map(r => r.objects)) : of([])),
    )
  }
}
