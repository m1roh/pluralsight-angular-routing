import { Component, OnInit } from '@angular/core';
import {AuthService, AuthState} from './services/auth.service';
import { IUser } from './user/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public pageTitle: string = 'Acme Product Management';
  public loggedIn: boolean;
  public userData: IUser;

  constructor(private authService_:AuthService,
              private route: Router) {}

  ngOnInit() {
    this.authService_.authChange.subscribe(
      (newAuthState) => this.loggedIn = (newAuthState === AuthState.LoggedIn)
    );
    this.authService_.userChange.subscribe(
      (newUserState) => this.userData = newUserState
    );
  }

  logout():void {
    this.authService_.logout();
    this.route.navigateByUrl('/welcome');
  }
}
