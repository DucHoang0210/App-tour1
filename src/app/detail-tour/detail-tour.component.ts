import { Component, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { MapComponent } from "../map/map.component";

@Component({
  selector: 'app-detail-tour',
  imports: [CommonModule, FormsModule, MapComponent],
  templateUrl: './detail-tour.component.html',
  styleUrl: './detail-tour.component.scss',
})
export class DetailTourComponent {

  // tăng số lượng ngày
  totalDays = 4;
  isShowItinerary: boolean[] = [];
  constructor() {
    // Khởi tạo mảng trạng thái theo số ngày của tour
    this.isShowItinerary = Array(this.totalDays).fill(false);
  }
  totalDaysArray(): number[] {
    return Array.from({ length: this.totalDays }, (_, i) => i + 1);
  }
  toggle(index: number) {
    this.isShowItinerary[index] = !this.isShowItinerary[index];
  }

  //chọn ngày bắt đầu - ngày kết thúc tour
  startDate: string = ''; //ngày bắt đầu
  endDate: Date | null = null; //ngày kết thúc

  updateEndDate() {
    if (this.startDate) {
      let start = new Date(this.startDate);
      start.setDate(start.getDate() + 4);
      this.endDate = start;
    }
  }

  // cuộn tới vị trí thì không cuộn nữa
  // isScrolled = false; // Biến theo dõi trạng thái cuộn
  // scrollThreshold = 500; // Vị trí cần thay đổi trạng thái

  // @HostListener("window:scroll", []) // Lắng nghe sự kiện cuộn
  // onWindowScroll() {
  //   const scrollPosition = window.scrollY || document.documentElement.scrollTop;
  //   this.isScrolled = scrollPosition > this.scrollThreshold;
  // }


  @ViewChild('sidebarRef') sidebarRef!: ElementRef;
  isScrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const sidebar = this.sidebarRef?.nativeElement;
    const content = document.querySelector('.content');

    if (sidebar && content) {
      const contentBottom = content.getBoundingClientRect().bottom;
      const sidebarHeight = sidebar.offsetHeight;
      const windowHeight = window.innerHeight;

      if (contentBottom <= windowHeight + sidebarHeight) {
        this.isScrolled = false; // Không cố định nữa khi chạm đáy
      } else {
        this.isScrolled = true; // Cố định bill khi chưa chạm đáy
      }
    }
  }




  //hiển thị thêm
  isShowReview = false;
  toggleDisplay() {
    this.isShowReview = !this.isShowReview;
    console.log("isShowReview: " , this.isShowReview);
  }

  // Bill tăng giảm số lượng người và tiền
  adults: number = 1;
  children: number = 0;

  adultPrice: number = 4990000;
  childPrice: number = 3990000;

  get totalPrice(): number {
    return this.adults * this.adultPrice + this.children * this.childPrice;
  }

  increaseAdults() {
    this.adults++;
  }

  decreaseAdults() {
    if (this.adults > 1) this.adults--;
  }

  increaseChildren() {
    this.children++;
  }

  decreaseChildren() {
    if (this.children > 0) this.children--;
  }

  // hàm modal xác nhận đặt tour
  fullName: string = '';
  phoneNumber: string = '';
  email: string = '';
  notes: string = '';

  openModal() {
    const modalElement = document.getElementById('confirmBookingModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  confirmBooking() {
    console.log('Xác nhận đặt tour với thông tin:', {
      fullName: this.fullName,
      phoneNumber: this.phoneNumber,
      email: this.email,
      notes: this.notes
    });
    alert('Đặt tour thành công!');
  }
}

