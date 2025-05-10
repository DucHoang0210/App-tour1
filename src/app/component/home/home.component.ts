import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {CommonModule} from '@angular/common';
import {Tour} from '../../models/tour';
import {TourService} from '../../services/tour.service';
import {Image} from '../../models/image';
@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  tours: Tour[] = [];
  ngOnInit(): void {
    // Load dữ liệu từ service hoặc gán dữ liệu giả để hiển thị
    this.loadTours();
  }

  loadTours() {
    this.tourService.getAllTours().subscribe({
      next: (data) => {
        this.tours = data;
        console.log('Dữ liệu tour nhận được:', data); // Kiểm tra dữ liệu
      },
      error: (err) => {
        console.error("Lỗi khi gọi API:", err);
      }
    });
  }
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
  constructor(private router: Router,private tourService: TourService) {}

  navigateToDetail(tourID: number) {
    this.router.navigate(['/detail-tour',tourID]);
  }
}
