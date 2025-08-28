import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureComponent } from './feature.component';
import { SettingComponent } from '../setting/setting.component';
import { LoginComponent } from '../Layout/login/login.component';
import { PaymentComponent } from './Payments/payment/payment.component';
import { QRCodeComponent } from 'angularx-qrcode';


@NgModule({
  declarations: [
    FeatureComponent,
PaymentComponent

  ],
  imports: [
    CommonModule,
    FeatureRoutingModule,
    QRCodeComponent

  ]
})
export class FeatureModule { }
