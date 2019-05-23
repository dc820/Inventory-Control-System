import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private authService: AuthService) {}

  hide = true;
  isLoading = false;

  onSignup(signupForm: NgForm) {
    this.isLoading = true;
    console.log(signupForm);
    if (signupForm.invalid) {
      return;
    }
    this.authService.createUser(signupForm.value.email, signupForm.value.password);
  }
}
