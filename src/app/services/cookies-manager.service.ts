import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesManagerService {

  constructor(private cookieService: CookieService) { }

  saveData(data: any, name: string) {
    this.cookieService.set(name, JSON.stringify(data));
  }

  getData(name: string) {
    return JSON.parse(this.cookieService.get(name));
  }

  deleteCookie(name: string) {
    this.cookieService.delete(name);
  }

  checkCookie(name: string): boolean {
    return this.cookieService.check(name);
  }
}
