import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideNavBarComponent } from './Layout/side-nav-bar/side-nav-bar.component';
import { NavBarComponent } from './Layout/nav-bar/nav-bar.component';
import { DashboardComponent } from './Layout/dashboard/dashboard.component';
import { LoginComponent } from './Layout/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { QRCodeComponent } from 'angularx-qrcode';
import { PaymentComponent } from './Payments/payment/payment.component';
import { SettingComponent } from './setting/setting.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

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
    SettingComponent,
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    QRCodeComponent,
    ReactiveFormsModule,
     BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
