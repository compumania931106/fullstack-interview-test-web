import { Component, OnInit } from '@angular/core';
import { PullsService } from '../../apis/pulls.service';
import { CookiesManagerService } from '../../services/cookies-manager.service';
import { ApiService } from '../../apis/api.service';

@Component({
  selector: 'app-pulls',
  templateUrl: './pulls.component.html',
  styleUrls: ['./pulls.component.scss']
})
export class PullsComponent implements OnInit {

  showNoticeDialog: boolean;
  showEnptyMessage: boolean;
  titleDialog: string;
  bodyDialog: string;

  pulls: Array<any>;

  constructor(
    private pullsService: PullsService,
    private cookiesManagerService: CookiesManagerService,
    private apiService: ApiService,
  ) {
    this.showNoticeDialog = false;
    this.showEnptyMessage = false;
    this.pulls = [];
  }

  ngOnInit(): void {
    this.getAllPulls();
  }

  getAllPulls() {
    this.pullsService.getAllPulls().subscribe(res => {
      console.log(res);
      this.pulls = res;

      if (this.pulls.length === 0) {
        this.titleDialog = 'Whitout Pull Requests';
        this.bodyDialog = 'At the moment, no Pull Request was found, create a new pull request.';
        this.showEnptyMessage = true;
        this.showNoticeDialog = true;
      }


    }, error => {
      console.log(error);

      if (error.status === 401) {
        this.apiService.removeToken();
        this.cookiesManagerService.deleteCookie('login-data');
        window.location.reload();
      }

      if (error.status === 404) {
        this.titleDialog = 'Whitout Pull Requests';
        this.bodyDialog = 'At the moment, no Pull Request was found, create a new pull request.';
        this.showEnptyMessage = true;
        this.showNoticeDialog = true;
      }
    });
  }

  receiveNoticeDialogEvent(event: any) {
    this.showNoticeDialog = false;
  }

  updatePullRequest(pull: any) {
    console.log(pull);

    const updatedPullRequest = {
      state: 'closed'
    };

    this.pullsService.updatePullRequest(pull.numberOfPull, updatedPullRequest).subscribe(res1 => {
      console.log(res1);

      this.getAllPulls();

    }, error1 => {
      console.log(error1);
      if (error1.status === 401) {
        this.apiService.removeToken();
        this.cookiesManagerService.deleteCookie('login-data');
        window.location.reload();
      }
    });
  }

}
