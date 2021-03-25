import {HttpClient, HttpHeaders, HttpParameterCodec, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from '../config';

export interface RequestOptions {
  params?: object;
  headers?: object;

  [x: string]: any;
}

interface HTTPClientRequestOptions {
  headers?: HttpHeaders;
  params?: HttpParams;
}

class HttpParamEncoder implements HttpParameterCodec {
  encodeKey(key: string): string {
    return encodeURIComponent(key);
  }

  encodeValue(value: string): string {
    return encodeURIComponent(value);
  }

  decodeKey(key: string): string {
    return decodeURIComponent(key);
  }

  decodeValue(value: string): string {
    return decodeURIComponent(value);
  }
}

const capitalize = (s) => s.replace(/^\w/, c => c.toUpperCase());

export abstract class RestClient {

  abstract getEndpoint(options?: RequestOptions): string;

  protected constructor(protected http: HttpClient,
                        protected configService: ConfigService) {
  }

  get basePath(): string {
    const {apiHost, apiPath} = this.configService.get();
    return `${apiHost}${apiPath}`;
  }

  protected toHttpParams(data: object): HttpParams {
    let httpParams = new HttpParams({encoder: new HttpParamEncoder()});
    if (data) {
      Object.keys(data).forEach((key) => {
        const value = data[key];
        if (value) {
          httpParams = httpParams.append(key, value);
        }
      });
    }
    return httpParams;
  }

  protected toHttpHeaders(data: object): HttpHeaders {
    let httpHeaders = new HttpHeaders();
    if (data) {
      Object.keys(data).forEach((key) => {
        const value = data[key];
        if (value) {
          httpHeaders = httpHeaders.append(key, data[key]);
        }
      });
    }
    return httpHeaders;
  }

  private toRequestOptions(options: RequestOptions): HTTPClientRequestOptions {
    const result = {};
    let key = 'params';
    if (options && options.params) {
      result[key] = this.toHttpParams(options.params);
    }
    if (options && options.headers) {
      key = 'headers';
      result[key] = this.toHttpHeaders(options.headers);
    }
    return result;
  }

  private fixHeaders(body: any, options?: RequestOptions): RequestOptions {
    const requestOptions = options || {};
    if (body && body instanceof HttpParams) {
      requestOptions.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...requestOptions.headers || {}
      };
    }
    return requestOptions;
  }

  query<T>(options?: RequestOptions): Observable<T> {
    return this.http.get<T>(this.getEndpoint(options), this.toRequestOptions(options));
  }

  get<T>(id: number | string, options?: RequestOptions): Observable<T> {
    return this.http.get<T>(`${this.getEndpoint(options)}/${id}`, this.toRequestOptions(options));
  }

  head<T>(id: number | string, options?: RequestOptions): Observable<T> {
    return this.http.head<T>(`${this.getEndpoint(options)}/${id}`, this.toRequestOptions(options));
  }

  postAt<T>(id: number | string, body: any | HttpParams, options?: RequestOptions): Observable<T> {
    const requestOptions = this.fixHeaders(body, options);
    return this.http.post<T>(`${this.getEndpoint(options)}/${id}`, body, this.toRequestOptions(requestOptions));
  }

  post<T>(body: any | HttpParams, options?: RequestOptions): Observable<T> {
    const requestOptions = this.fixHeaders(body, options);
    return this.http.post<T>(this.getEndpoint(options), body, this.toRequestOptions(requestOptions));
  }

  put<T>(id: number | string, body: any, options?: RequestOptions): Observable<T> {
    const requestOptions = this.fixHeaders(body, options);
    return this.http.put<T>(`${this.getEndpoint(options)}/${id}`, body, this.toRequestOptions(requestOptions));
  }

  patch<T>(id: number | string, body: any, options?: RequestOptions): Observable<T> {
    const requestOptions = this.fixHeaders(body, options);
    return this.http.patch<T>(`${this.getEndpoint(options)}/${id}`, body, this.toRequestOptions(requestOptions));
  }

  delete<T>(id: number | string, options?: RequestOptions): Observable<T> {
    const requestOptions = this.fixHeaders(null, options);
    return this.http.delete<T>(`${this.getEndpoint(options)}/${id}`, this.toRequestOptions(requestOptions));
  }
}
