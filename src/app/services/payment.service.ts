import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) { }

  paymentVNPay(amount:any,bookingId : any, userId: any ): Observable<any>{
    return this.http.get(`${this.baseUrl}/api/v1/payment/vn-pay?amount=${amount}&bankCode=NCB&bookingId=${bookingId}&userId=${userId}`,{observe: 'response'});
  }
}
