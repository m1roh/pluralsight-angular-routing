import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { UserModule } from './user/user.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductData } from './products/product-data';
import { AppRoutingModule } from './app-routing.module';
import { MessageModule } from './messages/message.module';
import { ProductModule } from './products/product.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    AppRoutingModule,
    MessageModule,
    ProductModule,
    UserModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
