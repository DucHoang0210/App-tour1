import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-travel-tips',
  imports: [CommonModule],
  templateUrl: './travel-tips.component.html',
  styleUrl: './travel-tips.component.scss'
})
export class TravelTipsComponent {
  tips = [
    {
      title: 'Top 5 địa điểm du lịch miền Bắc mùa thu',
      summary: 'Trải nghiệm sắc thu vàng rực rỡ tại Sapa, Hà Giang, Ninh Bình...',
      image: 'assets/images/muathu.jpg',
    },
    {
      title: 'Bí kíp săn vé máy bay giá rẻ',
      summary: 'Tổng hợp mẹo săn vé rẻ để vi vu khắp Việt Nam mà không lo cháy túi.',
      image: 'assets/images/maybay.png',
    },
    {
      title: 'Checklist du lịch Phú Quốc tự túc',
      summary: 'Hướng dẫn chi tiết từ A-Z cho chuyến đi Phú Quốc đáng nhớ.',
      image: 'assets/images/list-phu-quoc.jpg',
    },
  ];
}
