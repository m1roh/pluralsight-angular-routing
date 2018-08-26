import { Component } from '@angular/core';

import { AuthService } from './user/auth.service';

@Component({
             selector: 'app-root',
             templateUrl: './app.component.html',
             styleUrls: [ './app.component.scss' ]
           })
export class AppComponent {
  pageTitle: string = 'Acme Product Management';

  constructor(public authService: AuthService) {
  }

  logOut(): void {
    this.authService.logout();
    console.log('Log out');
  }
}
