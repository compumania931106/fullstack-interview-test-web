import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  showHiddenMenu: boolean;

  constructor() {
    this.showHiddenMenu = false;
  }

  ngOnInit(): void {
  }

  showMenu() {
    this.showHiddenMenu = !this.showHiddenMenu;
  }

}
