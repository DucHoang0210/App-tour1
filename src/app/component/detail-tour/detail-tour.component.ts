import {Component, HostListener, ViewChild, ElementRef, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { MapComponent } from "../map/map.component";
import Swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
import {TourService} from '../../services/tour.service';
import {Tour} from '../../models/tour';
import {Image} from '../../models/image';
import {Itinerary} from '../../models/itinerary';
import {Router} from '@angular/router';
import {BookingService} from '../../services/booking.service';
import {LoginService} from '../../services/login.service';
import {PaymentService} from '../../services/payment.service';
// Khai báo tạm nếu không có types
import { Client, IMessage, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {Route} from '@angular/router';
import {ReviewCard} from '../../models/reviewCard';

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
  username! : string;

  adultPrice: number = 0;
  childPrice: number = 0;
  userId!: number;
  public isModalOpen = false;
  public header = '';
  public message = '';
  private socket: WebSocket | undefined;
  constructor(private route : ActivatedRoute, private tourService: TourService, private bookingService: BookingService,
              private rt: Router, private loginService : LoginService, private paymentService: PaymentService, private router: Router) {
  }
  ngOnInit(): void {
    this.tourID = Number(this.route.snapshot.params['tourID']);
    this.getUser();
    this.inforTourDetail();
    this.listImages();
    this.listItinerary();
    // this.connectWebSocket();
  }
  // connectWebSocket() {
  //   const socket = new SockJS('http://localhost:8080/ws');
  //   const stompClient = new Client({
  //     webSocketFactory: () => socket,
  //     debug: (str) => console.log(str),
  //     reconnectDelay: 5000,
  //     onConnect: () => {
  //       console.log('WebSocket connected');
  //       stompClient.subscribe(`/topic/tour/${this.tourID}`, (message) => {
  //         console.log('Received message:', message.body);
  //         if (message.body === 'success') {
  //           this.header = 'Thanh toán thành công';
  //           this.message = 'Vé của bạn đã thanh toán thành công!';
  //           this.isModalOpen = true;
  //         } else if (message.body === 'fail') {
  //           this.header = 'Thanh toán thất bại';
  //           this.message = 'Đã xảy ra lỗi trong quá trình thanh toán!';
  //           this.isModalOpen = true;
  //         }
  //       });
  //     },
  //     onStompError: (frame) => {
  //       console.error('STOMP Error:', frame);
  //     }
  //   });
  //
  //   stompClient.activate();
  // }

  onModalClose(): void {
    this.isModalOpen = false;
    if (this.header.includes('thành công')) {
      this.router.navigate(['/my/ticket']);
    } else {
      this.router.navigate(['/']);
    }
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

  // review
  reviews: ReviewCard[] = [
    {
      name: 'Nguyen Van Hung',
      avatar: '/assets/images/customerReview.jpg',
      rating: 5,
      date: new Date('2025-04-20'),
      content: 'Tôi rất hài lòng với dịch vụ của tour. Nhân viên tư vấn nhiệt tình, hướng dẫn viên chuyên nghiệp, am hiểu địa phương. Lịch trình hợp lý, phương tiện di chuyển sạch sẽ, khách sạn và nhà hàng chất lượng. Một trải nghiệm tuyệt vời, đáng để giới thiệu!'
    },
    {
      name: 'Tran Thi Bien',
      avatar: '/assets/images/avt-review.jpg',
      rating: 4,
      date: new Date('2025-04-18'),
      content: 'Tour khá ổn, hướng dẫn viên nhiệt tình...'
    },
    {
      name: 'Hoang Van Hoa',
      avatar: '/assets/images/avt-review.jpg',
      rating: 5,
      date: new Date('2025-04-05'),
      content: 'Tour khá ổn, hướng dẫn viên nhiệt tình...'
    },
    {
      name: 'Tran Van Dung',
      avatar: '/assets/images/avt-review.jpg',
      rating: 5,
      date: new Date('2025-01-18'),
      content: 'Tour khá ổn, hướng dẫn viên nhiệt tình...'
    }]

  get countReviewCard(): number {
    return this.reviews.length;
  }

  total = this.reviews.reduce((sum, review) => sum + Number(review.rating), 0);
  averageRating: number = this.reviews.length ? this.total / this.reviews.length : 0;

  calculateAverageRating() {
    const total = this.reviews.reduce((sum, review) => sum + Number(review.rating), 0);
    this.averageRating = this.reviews.length ? total / this.reviews.length : 0;
  }

  get ratingPercentages() {
    const total = this.reviews.length;
    const percentages: { [key: number]: number } = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0
    };

    if (total === 0) return percentages;

    this.reviews.forEach(review => {
      const r = review.rating;
      if (percentages[r] !== undefined) {
        percentages[r]++;
      }
    });

    // Tính phần trăm
    for (const star in percentages) {
      percentages[star] = Math.round((percentages[star] / total) * 100);
    }

    return percentages;
  }

  // // Lọc review theo số sao đánh giá
  selectedStar: number = 0; // 0 nghĩa là không lọc

  get filteredReviews(): ReviewCard[] {
    if (this.selectedStar === 0) {
      return this.reviews;
    }
    return this.reviews.filter(review => review.rating === this.selectedStar);
  }

  // Thêm mới review của khách hàng
  newReview: ReviewCard = {
    name: '',
    avatar: '/assets/images/default-avatar.jpg', // avatar mặc định
    rating: 5,
    date: new Date(),
    content: ''
  };

  submitReview() {
    if (!this.newReview.content.trim()) {
      alert('Vui lòng nhập nội dung đánh giá.');
      return;
    }

    const reviewToAdd: ReviewCard = {
      ...this.newReview,
      name: this.username,
      rating: Number(this.newReview.rating), // Ép kiểu để tránh lỗi tính toán
      date: new Date()
    };

    this.reviews.unshift(reviewToAdd); // Thêm vào đầu danh sách
    this.calculateAverageRating();     // ✅ Cập nhật điểm trung bình

    // Reset form đánh giá
    this.newReview = {
      name: '',
      avatar: '/assets/images/default-avatar.jpg',
      rating: 5,
      date: new Date(),
      content: ''
    };

    Swal.fire({
      icon: 'success',
      title: 'Cảm ơn bạn!',
      text: 'Đánh giá của bạn đã được ghi nhận.'
    });
  }
  showAllReviews: boolean = false;
  toggleReviews() {
    this.showAllReviews = !this.showAllReviews;
  }
  }

