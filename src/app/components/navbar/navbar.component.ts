import { Component, OnInit } from '@angular/core';
import { CookiesManagerService } from '../../services/cookies-manager.service';
import { ApiService } from '../../apis/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showHiddenMenu: boolean;
  showLoginDialog: boolean;
  isLoggedIn: boolean;

  constructor(
    private cookiesManagerService: CookiesManagerService,
    private apiService: ApiService,
    private router: Router,
  ) {
    this.showHiddenMenu = false;
    this.showLoginDialog = false;
    this.checkIsLoginPresent();
  }

  ngOnInit(): void {
  }

  showMenu() {
    this.showHiddenMenu = !this.showHiddenMenu;
  }

  checkIsLoginPresent() {
    if (this.cookiesManagerService.checkCookie('login-data')) {
      const data = this.cookiesManagerService.getData('login-data');
      this.apiService.setToken(data.token);
      this.isLoggedIn = true;
    } else {
      this.isLoggedIn = false;
    }
  }

  openLoginDialog() {
    this.showLoginDialog = true;
  }

  receiveLoginDialogEvent(event: any) {
    if (event) {
      if (event.login === true) {
        this.isLoggedIn = true;
      }
    }
    this.showLoginDialog = false;
  }

  logout() {
    this.apiService.removeToken();
    this.cookiesManagerService.deleteCookie('login-data');
    this.isLoggedIn = false;
    this.router.navigate([`/home`]);
  }

}
