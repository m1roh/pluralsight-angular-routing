import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    CommonModule
  ],
  exports: [
  ]
})
export class UserModule {
}
