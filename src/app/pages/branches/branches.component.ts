import { Component, OnInit } from '@angular/core';
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

}
