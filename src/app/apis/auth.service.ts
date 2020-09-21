import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private BASE = 'auth';

  constructor(
    private api: ApiService
  ) { }

  login(data: any): Observable<any> {
    return this.api.post(this.BASE, data);
  }
}
