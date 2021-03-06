import { Component, OnInit } from '@angular/core';
import { BranchesService } from '../../apis/branches.service';
import { PullsService } from '../../apis/pulls.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { CookiesManagerService } from '../../services/cookies-manager.service';
import { ApiService } from '../../apis/api.service';

@Component({
  selector: 'app-new-pull',
  templateUrl: './new-pull.component.html',
  styleUrls: ['./new-pull.component.scss']
})
export class NewPullComponent implements OnInit {

  branches: Array<any>;
  branchesForOrigin: Array<any>;
  baseBranch: string;
  headBranch: string;

  titleDialog: string;
  bodyDialog: string;

  formNewPullRequest: FormGroup;

  showFormComplete: boolean;
  showNoticeDialog: boolean;

  showErrorTitle: boolean;
  showErrorBody: boolean;

  constructor(
    private cookiesManagerService: CookiesManagerService,
    private apiService: ApiService,
    private branchesService: BranchesService,
    private pullsService: PullsService,
    private formBuilder: FormBuilder,
    private location: Location,
  ) {
    this.showFormComplete = false;
    this.showNoticeDialog = false;
    this.showErrorTitle = false;
    this.showErrorBody = false;
    this.branches = [];
    this.branchesForOrigin = [];
    this.baseBranch = '';
    this.headBranch = '';
  }

  ngOnInit(): void {
    this.getAllBranches();
    this.loadForm();
  }

  loadForm() {
    this.formNewPullRequest = this.formBuilder.group({
      title: ['', [Validators.required]],
      body: ['', [Validators.required]],
      saveAs: ['', [Validators.required]]
    });
  }

  getAllBranches() {
    this.branchesService.getBranches().subscribe(res => {
      // console.log(res);
      this.branches = res;
    }, error1 => {
      console.log(error1);
    });
  }

  selectedBaseBranch(event: any) {
    this.branchesForOrigin = [...this.branches];
    this.branchesForOrigin = this.branchesForOrigin.filter((branch) => {
      return branch.name !== this.baseBranch;
    });

    console.log(this.branchesForOrigin);
  }

  compareBranches(event: any) {
    if (this.baseBranch !== '' && this.headBranch !== '') {
      this.branchesService.compareTwoBranches(this.baseBranch, this.headBranch).subscribe(res => {
        // console.log(res);

        this.showFormComplete = true;

      }, error1 => {
        console.log(error1);
      });
    }
  }

  createPullRequest() {

    if (this.formNewPullRequest.valid) {

      const dataForCreationOfPullRequest = {
        title: this.formNewPullRequest.get('title').value,
        body: this.formNewPullRequest.get('body').value,
        head: this.headBranch,
        base: this.baseBranch
      };

      console.log(dataForCreationOfPullRequest);

      this.pullsService.createPullRequest(dataForCreationOfPullRequest).subscribe(res1 => {
        // console.log(res1);

        if (this.formNewPullRequest.get('saveAs').value === 'merge') {

          this.pullsService.mergePullRequest(res1.number).subscribe(res2 => {
            // console.log(res2);

            this.titleDialog = 'Pull request created successfully';
            this.bodyDialog = `he pull request with the number ${res1.number}, has been created and merged successfully`;
            this.showNoticeDialog = true;

          }, error2 => {
            console.log(error2);

            if (error2.status === 401) {
              this.apiService.removeToken();
              this.cookiesManagerService.deleteCookie('login-data');
              window.location.reload();
            }

            this.titleDialog = 'Pull Request could not be created';
            this.bodyDialog = `Pull Request is not mergeable`;
            this.showNoticeDialog = true;
          });

        } else {
          // Show the dialog of success creating Pull Request
          this.titleDialog = 'Pull request created successfully';
          this.bodyDialog = `he pull request with the number ${res1.number}, has been created successfully.`;
          this.showNoticeDialog = true;
        }


      }, error1 => {
        // Show the dialog of error for creating Pull Request
        console.log(error1);

        if (error1.status === 401) {
          this.apiService.removeToken();
          this.cookiesManagerService.deleteCookie('login-data');
          window.location.reload();
        }

        this.titleDialog = 'Pull Request could not be created';
        this.bodyDialog = `Validation failed with errors: `;
        error1.error.errors.forEach(element => {
          this.bodyDialog += `${element.message}`;
        });
        this.showNoticeDialog = true;
      });
    }

  }

  receiveNoticeDialogEvent(event: any) {
    this.showNoticeDialog = false;
    this.location.back();
  }

}
