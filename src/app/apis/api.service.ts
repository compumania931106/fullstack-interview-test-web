import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  headers: any;

  constructor(
    private http: HttpClient
  ) {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

  get(endpoint: string, params?: any): any {
    const options = { headers: this.headers };
    if (params) {
      let paramsLocal = new HttpParams();
      Object.keys(params).forEach((k) => {
        paramsLocal = paramsLocal.append(k, params[k]);
      });
      // tslint:disable-next-line:no-string-literal
      options['params'] = paramsLocal;
    }
    return this.http.get(URL + '/' + endpoint + `?${Math.random().toString(36).substring(5)}`, options);
  }

  post(endpoint: string, body: any) {
    const options = { headers: this.headers };
    return this.http.post(URL + '/' + endpoint, body, options);
  }

  put(endpoint: string, body: any) {
    const options = { headers: this.headers };
    return this.http.put(URL + '/' + endpoint, body, options);
  }

  delete(endpoint: string) {
    const options = { headers: this.headers };
    return this.http.delete(URL + '/' + endpoint, options);
  }
}
