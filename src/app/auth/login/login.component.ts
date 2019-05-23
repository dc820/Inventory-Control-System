import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  isLoading = false;

  constructor(public authService: AuthService) {}

  onLogin(loginForm: NgForm) {
    this.isLoading = true;
    console.log('Login');
    console.log(loginForm);

    if (loginForm.invalid) {
      return;
    }
    this.authService.login(loginForm.value.email, loginForm.value.password);
  }
}
