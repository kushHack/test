import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/shared/services/auth-service.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent {

  constructor(private titleService: Title, private authService: AuthService) {
    this.titleService.setTitle('Sign Up');
  }
  signUpForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  get email() {
    return this.signUpForm.get('email')
  }
  get password() {
    return this.signUpForm.get('password')
  }

  onSignup(data: any) {
    if (this.signUpForm.invalid) {
      return;
    }
    // this.authService.signup(data)
  }
}


