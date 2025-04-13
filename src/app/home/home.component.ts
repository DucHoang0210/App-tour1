import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  // cuon trang cho bill khong cuon theo
  @ViewChild('productContainer', { static: false }) productContainer!: ElementRef;

  scroll(direction: string, index: number) {
    const rows = document.querySelectorAll('.row');
    if (!rows[index]) {
      console.error("Không tìm thấy row với index:", index);
      return;
    }

    const container = rows[index] as HTMLElement;
    const productCard = container.querySelector('.product-card') as HTMLElement;

    if (!productCard) {
      console.error("Không tìm thấy .product-card!");
      return;
    }

    const cardWidth = productCard.offsetWidth + 25;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;

    console.log(`Đang cuộn ${direction}, Khoảng cách: ${scrollAmount}`);
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }

  // click vao san pham
  constructor(private router: Router) {}

  navigateToDetail() {
    this.router.navigate(['/detail-tour']);
  }
}
