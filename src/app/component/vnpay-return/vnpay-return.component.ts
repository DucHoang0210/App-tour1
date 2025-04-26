// vnpay-return.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vnpay-return',
  standalone: true,
  imports: [],
  templateUrl: './vnpay-return.component.html',
  styleUrls: ['./vnpay-return.component.scss'],
})
export class VnpayReturnComponent {
  status = 'Đang xử lý...';

  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.status = params['vnp_ResponseCode'] === '00' ? 'Thành công!' : 'Thất bại!';
    });
  }
}
