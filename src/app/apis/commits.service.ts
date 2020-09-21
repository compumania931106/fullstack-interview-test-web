import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommitsService {

  private BASE = 'commits';

  constructor(
    private api: ApiService
  ) { }

  getCommitsByBranch(branchName: string): Observable<any> {
    return this.api.get(`${this.BASE}/${branchName}`);
  }

  getCommitDetail(ref: string): Observable<any> {
    return this.api.get(`${this.BASE}/detail/${ref}`);
  }
}
