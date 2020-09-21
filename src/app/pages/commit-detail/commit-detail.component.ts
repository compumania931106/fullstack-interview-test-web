import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommitsService } from '../../apis/commits.service';
import { CookiesManagerService } from '../../services/cookies-manager.service';
import { ApiService } from '../../apis/api.service';

@Component({
  selector: 'app-commit-detail',
  templateUrl: './commit-detail.component.html',
  styleUrls: ['./commit-detail.component.scss']
})
export class CommitDetailComponent implements OnInit {

  ref: string;
  commit: any;

  constructor(
    private cookiesManagerService: CookiesManagerService,
    private commitsService: CommitsService,
    private apiService: ApiService,
    private route: ActivatedRoute,
  ) {
    this.ref = this.route.snapshot.paramMap.get('ref');
  }

  ngOnInit(): void {
    this.getCommitDetail();
  }

  getCommitDetail() {
    this.commitsService.getCommitDetail(this.ref).subscribe(res => {
      // console.log(res);
      this.commit = res;
    }, error => {
      console.log(error);
      if (error.status === 401) {
        this.apiService.removeToken();
        this.cookiesManagerService.deleteCookie('login-data');
        window.location.reload();
      }
    });
  }

}
