import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommitsService } from '../../apis/commits.service';
import { CookiesManagerService } from '../../services/cookies-manager.service';
import { ApiService } from '../../apis/api.service';

@Component({
  selector: 'app-branch-detail',
  templateUrl: './branch-detail.component.html',
  styleUrls: ['./branch-detail.component.scss']
})
export class BranchDetailComponent implements OnInit {

  branchName: string;
  commits: Array<any>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private commitsService: CommitsService,
    private cookiesManagerService: CookiesManagerService,
    private apiService: ApiService,
  ) {
    this.branchName = this.route.snapshot.paramMap.get('branchName');

    this.commits = [];
  }

  ngOnInit(): void {
    this.getCommitsByBranch();
  }

  getCommitsByBranch() {
    this.commitsService.getCommitsByBranch(this.branchName).subscribe(res => {
      console.log(res);
      this.commits = res;
    }, error => {
      console.log(error);
      if (error.status === 401) {
        this.apiService.removeToken();
        this.cookiesManagerService.deleteCookie('login-data');
        window.location.reload();
      }
    });
  }

  showCommitDetail(commit) {
    console.log(commit);
    this.router.navigate([`/branches/${this.branchName}/commits/${commit.sha}`]);
  }

}
