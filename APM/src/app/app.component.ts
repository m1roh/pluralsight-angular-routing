import { Component, OnInit } from '@angular/core';
import { AuthService, AuthState } from './services/auth.service';
import { IUser } from './user/user';
import { Event, NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  public pageTitle: string = 'Acme Product Management';
  public loggedIn: boolean;
  public userData: IUser;
  public loading = true;

  constructor(private authService_: AuthService,
              private route: Router) {
  }

  ngOnInit() {
    this.authService_.authChange.subscribe(
      (newAuthState) => this.loggedIn = (newAuthState === AuthState.LoggedIn)
    );
    this.authService_.userChange.subscribe(
      (newUserState) => this.userData = newUserState
    );

    this.route.events.subscribe(
      (routerEvent: Event) => {
        this.checkRouterEvent(routerEvent);
      }
    );
  }

  checkRouterEvent(routerEvent: Event): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationEnd) {
      this.loading = false;
    }
  }

  logout(): void {
    this.authService_.logout();
    this.route.navigateByUrl('/welcome');
  }
}
