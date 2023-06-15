import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LoginCred } from 'src/app/shared/interfaces/auth.model';
import { AuthService } from 'src/app/shared/services/auth-service.service';
import { SpinnerService } from 'src/app/shared/utils/spinner.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  role = 'User';
  placeholder_email = 'email';
  loginData = {
    userName: 'vishal@northland.com',
    password: 'North@123'
  }

  constructor(
    private titleService: Title,
    private authService: AuthService,
    private spinner: SpinnerService
  ) {
    this.titleService.setTitle('Northland Login');
  }

  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })
  get userName() {
    return this.loginForm.get('userName')
  }
  get password() {
    return this.loginForm.get('password')
  }

  onLogin(data: LoginCred) {
    if (this.loginForm.invalid) {
      return;
    }
    this.spinner.change(true)
    this.authService.login(data)
  }
}

