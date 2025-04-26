import {Component, HostListener, ViewChild, ElementRef, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { MapComponent } from "../map/map.component";
import {ActivatedRoute} from '@angular/router';
import {TourService} from '../../services/tour.service';
import {Tour} from '../../models/tour';
import {Image} from '../../models/image';
import {Itinerary} from '../../models/itinerary';
import {Router} from '@angular/router';
import {BookingService} from '../../services/booking.service';
import {LoginService} from '../../services/login.service';
import {PaymentService} from '../../services/payment.service';

@Component({
  selector: 'app-detail-tour',
  imports: [CommonModule, FormsModule],
  templateUrl: './detail-tour.component.html',
  styleUrl: './detail-tour.component.scss',
  providers: [TourService,BookingService,LoginService,PaymentService]
})
export class DetailTourComponent implements OnInit{
  tourID!: number;
  tour: Tour = new Tour;
  images : Image[] = [];
  itinerarys : Itinerary[] = [];
  adultPrice: number = 0;
  childPrice: number = 0;
  userId!: number;

  constructor(private route : ActivatedRoute, private tourService: TourService, private bookingService: BookingService,
              private rt: Router, private loginService : LoginService, private paymentService: PaymentService ) {
  }
  ngOnInit(): void {
    this.tourID = Number(this.route.snapshot.params['tourID']);
    this.getUser();
    this.inforTourDetail();
    this.listImages();
    this.listItinerary();

  }
  getUser = () =>{
    this.loginService.getUser().subscribe({
      next: (response) => {
        this.userId = response.body.user.userID;
      },
      error: error => {
        console.log(error);
      }
    })
  }
  listImages(){

    this.tourService.getImageDetail(this.tourID).subscribe({
      next: (response) => {
        this.images = response;
      },error : error => {(error);
      }
    });
  }

  listItinerary(){

    this.tourService.getItinerary(this.tourID).subscribe({
      next: (response) => {
        this.itinerarys = response;
        console.log('phan hoi tu server : ' ,this.itinerarys);
      }
    })
  }

  inforTourDetail(){

    this.tourService.getTourById(this.tourID).subscribe({
      next: (response) => {
        this.tour = response.tour;
        this.adultPrice = this.tour.priceAdult;
        this.childPrice = this.tour.priceChild;
        console.log('Phản hồi từ server tour:', response.tour, this.adultPrice, this.childPrice);
      },
      error: (error) => {
        console.error('Lỗi khi đăng ký:', error);

      }
    });
}

  // tăng số lượng ngày
  totalDays = 4;
  isShowItinerary: boolean = false;


  totalDaysArray(): number[] {
    return Array.from({ length: this.totalDays }, (_, i) => i + 1);
  }
  toggle() {
    this.isShowItinerary = !this.isShowItinerary;
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
  adults: number = 0;
  children: number = 0;



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

  confirmBooking = () => {
    const bookingData = {
      tourID: this.tourID,
      bookingDate: this.startDate,
      numAdults: this.adults,
      numChildren: this.children,
      totalPrice: this.totalPrice,
      specialRequest: this.notes,
      username: this.fullName,
      phoneNumber: this.phoneNumber,
      email: this.email
    };

    console.log("Booking Data:", bookingData);

    this.bookingService.crateBooking(bookingData).subscribe({
      next: (response) => {
        if (response.status === 200) {
          console.log("Booking successful:", response);
          const bookingId = response.body.bookingId;
          this.paymentService.paymentVNPay(this.totalPrice, bookingId, this.userId).subscribe({
            next: (response) => {
              console.log(response);
              const paymentUrl = response.body.data.paymentUrl;
              window.open(paymentUrl, '_blank');
              
            },
            error: error => {
              console.log(error);
            }
          });
        }
      },
      error: (error) => {
        console.error("Booking failed:", error);
      }
    });
    alert('Đặt tour thành công!');
  }
}

