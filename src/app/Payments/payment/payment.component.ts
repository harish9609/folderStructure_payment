import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  //url of payment
qrData: string = 'upi://pay?pa=harishkoundal077@okicici&pn=Harish%20Koundal&am=100';


showCardFields = false;

toggleCardFields() {
  this.showCardFields = !this.showCardFields;
}

}
