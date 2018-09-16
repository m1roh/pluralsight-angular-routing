import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  public errorMessage: string;
  public pageTitle = 'Log In';
  public userName: string;
  public password: string;

  constructor(private authService: AuthService,
              private router: Router) {
  }

  login(loginForm: NgForm) {
    if (loginForm && loginForm.valid) {
      let userName = loginForm.value.userName;
      let password = loginForm.form.value.password;
      this.authService.login(userName, password);
      this.router.navigate(['/products']);
    } else {
      this.errorMessage = 'Please enter a user name and password.';
    }
  }
}
