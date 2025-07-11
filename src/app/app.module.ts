import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavBarComponent } from './Layout/side-nav-bar/side-nav-bar.component';
import { NavBarComponent } from './Layout/nav-bar/nav-bar.component';
import { DashboardComponent } from './Layout/dashboard/dashboard.component';
import { LoginComponent } from './Layout/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { PaymentComponent } from './Payments/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    SideNavBarComponent,
    NavBarComponent,
    DashboardComponent,
    LoginComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    PaymentComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QRCodeComponent

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
