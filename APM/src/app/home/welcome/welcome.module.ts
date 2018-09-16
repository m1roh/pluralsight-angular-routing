import { NgModule } from '@angular/core';

import { WelcomeComponent } from './welcome.component';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';

@NgModule({
  imports: [
    WelcomeRoutingModule
  ],
  declarations: [
    WelcomeComponent
  ],
  providers: [
    CommonModule
  ],
  exports: [
    WelcomeComponent
  ]
})
export class WelcomeModule {
}
