import {Injectable} from '@angular/core';
import {RestClient} from '../rest';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from '../config';
import {Observable} from 'rxjs';
import {ApiResponse, ResourceDTO} from '../models';

@Injectable({
  providedIn: 'root'
})
export class ResourceService extends RestClient {

  constructor(http: HttpClient,
              configService: ConfigService) {
    super(http, configService);
  }

  getEndpoint(): string {
    return `${this.basePath}/resources/`;
  }

  getResources(): Observable<ApiResponse<ResourceDTO>> {
    return this.query();
  }

  getResource(id: string): Observable<ResourceDTO> {
    return this.get(id);
  }
}
