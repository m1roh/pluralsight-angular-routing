import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';

import { SharedModule } from '../shared/shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
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
