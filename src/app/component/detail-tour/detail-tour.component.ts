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
  [x: string]: any;

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
  isScrolled = false; // Biến theo dõi trạng thái cuộn
  scrollThreshold = 100; // Vị trí cần thay đổi trạng thái

  @HostListener("window:scroll", []) // Lắng nghe sự kiện cuộn
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;
    this.isScrolled = scrollPosition > this.scrollThreshold;
  }


  // @ViewChild('sidebarRef') sidebarRef!: ElementRef;
  // isScrolled = false;

  //hiển thị thêm
  isShowReview = false;
  toggleDisplay() {
    this.isShowReview = !this.isShowReview;
    console.log("isShowReview: ", this.isShowReview);
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
    let valid = true;

    const phoneRegex = /^0\d{9,10}$/; // Bắt đầu bằng 0, dài 10-11 số
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Định dạng email đơn giản

    if (!this.fullName.trim()) {
      alert('Vui lòng nhập họ tên');
      valid = false;
      return;
    }

    if (!this.phoneNumber.trim()) {
      alert('Vui lòng nhập số điện thoại');
      valid = false;
      return;
    }

    if (!phoneRegex.test(this.phoneNumber)) {
      alert('Số điện thoại không hợp lệ (phải từ 10 đến 11 số và bắt đầu bằng 0)');
      valid = false;
      return;
    }

    if (!this.email.trim()) {
      alert('Vui lòng nhập email');
      valid = false;
      return;
    }

    if (!emailRegex.test(this.email)) {
      alert('Email không hợp lệ (phải có định dạng ten@domain.com)');
      valid = false;
      return;
    }
    if (valid) {
        console.log('Xác nhận đặt tour với thông tin:', {
        fullName: this.fullName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        notes: this.notes,
        adults: this.adults,
        children: this.children,
        startDate: this.startDate,
        endDate: this.endDate
      });
      alert('Đặt tour thành công!');
    }
  }
}

