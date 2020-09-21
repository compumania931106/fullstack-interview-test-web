import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommitsService } from '../../apis/commits.service';

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
    });
  }

  showCommitDetail(commit) {
    console.log(commit);
    this.router.navigate([`/branches/${this.branchName}/commits/${commit.sha}`]);
  }

}
