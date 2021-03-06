import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../apis/auth.service';
import { ApiService } from '../../apis/api.service';
import { CookiesManagerService } from '../../services/cookies-manager.service';

@Component({
  selector: 'app-login-form-dialog',
  templateUrl: './login-form-dialog.component.html',
  styleUrls: ['./login-form-dialog.component.scss']
})
export class LoginFormDialogComponent implements OnInit {

  @Output() modalEvent = new EventEmitter<boolean>();

  formLogin: FormGroup;
  errorMessage: string;
  showErrorDiv: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private apiService: ApiService,
    private cookiesManagerService: CookiesManagerService,
  ) {
    this.showErrorDiv = false;
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.formLogin = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.formLogin.valid) {
      const credentials = {
        username: this.formLogin.get('username').value,
        password: this.formLogin.get('password').value
      };

      this.authService.login(credentials).subscribe(res => {
        // console.log(res);

        this.apiService.setToken(res.token);
        this.cookiesManagerService.saveData(res, 'login-data');

        this.closeModalFunction({login: true});

      }, error => {
        // console.log(error);

        if (error.status === 401 || error.status === 404) {
          this.errorMessage = 'The access data is not valid.',
          this.showErrorDiv = true;
        } else {
          this.errorMessage = 'An unexpected error has occurred, please try again later.',
          this.showErrorDiv = true;
        }
      });
    }
  }

  closeModalFunction(data?: any) {
    this.formLogin.reset();
    this.modalEvent.emit(data);
  }

}
