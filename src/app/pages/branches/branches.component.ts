import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BranchesService } from '../../apis/branches.service';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  branches: Array<any>;

  constructor(
    private branchesService: BranchesService,
    private router: Router,
  ) {
    this.branches = [];
  }

  ngOnInit(): void {
    this.getAllBranches();
  }

  getAllBranches() {
    this.branchesService.getBranches().subscribe(res => {
      console.log(res);
      this.branches = res;
    }, error => {
      console.log(error);
    });
  }

  showBranchDetail(branch: any) {
    this.router.navigate([`/branches/${branch.name}/commits`]);
  }

}
