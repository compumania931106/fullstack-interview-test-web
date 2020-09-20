import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  private BASE = 'branches';

  constructor(
    private api: ApiService
  ) { }

  getBranches(): Observable<any> {
    return this.api.get(this.BASE);
  }

  getBranchDetails(branchName: string): Observable<any> {
    return this.api.get(`${this.BASE}/${branchName}`);
  }
}
