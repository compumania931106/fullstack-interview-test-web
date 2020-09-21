import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PullsService {

  private BASE = 'pulls';

  constructor(
    private api: ApiService
  ) { }

  getAllPulls(): Observable<any> {
    return this.api.get(this.BASE);
  }

  createPullRequest(data: any): Observable<any> {
    return this.api.post(this.BASE, data);
  }

  mergePullRequest(numberOfPullRequest: number): Observable<any> {
    return this.api.put(`${this.BASE}/merge/${numberOfPullRequest}`, {});
  }

  updatePullRequest(numberOfPullRequest: number, data: any): Observable<any> {
    return this.api.put(`${this.BASE}/${numberOfPullRequest}`, data);
  }
}
