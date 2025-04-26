import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent {
  constructor(private http: HttpClient) {}

  payNow() {
    const orderId = 'ORDER123';
    const amount = 500000;

    this.http.post<{ paymentUrl: string }>('http://localhost:3000/api/vnpay/create', {
      amount,
      orderId,
    }).subscribe((res) => {
      window.location.href = res.paymentUrl;
    });
  }
}
