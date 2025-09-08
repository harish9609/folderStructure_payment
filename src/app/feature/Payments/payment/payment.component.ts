import { Component } from '@angular/core';
import { trigger, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
   animations: [
    trigger('blurFadeIn', [
      transition(':enter', [
        style({ opacity: 0, filter: 'blur(8px)', transform: 'scale(0.5)' }),
        animate(
          '600ms ease-out',
          style({ opacity: 1, filter: 'blur(0px)', transform: 'scale(1)' })
        )
      ])
    ])
  ]
})
export class PaymentComponent {
  //url of payment
  tset5:any

// qrData: string = 'upi://pay?pa=harishkoundal077@okicici&pn=Harish%20Koundal&am=99999';


showCardFields = false;

toggleCardFields() {
  this.showCardFields = !this.showCardFields;
}


 qrData: string = 'upi://pay?pa=harishkoundal077@okicici&pn=Harish%20Koundal&am=99999';
  showQR = false;

 generateQR() {
    this.showQR = true;
  }
}
