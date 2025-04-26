import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { MapComponent } from "../map/map.component";
import Swal from 'sweetalert2';
import { ReviewCard } from 'app/models/review-card';
import { Tour } from 'app/models/tour';
import { Router } from '@angular/router';

interface ItineraryDay {
  title: string;
  details: string[];
}

interface User {
  name: string;
  avatar: string;
}

interface DetailTour {
  name: string;
  description: string;
  hightlight: string[];
}

@Component({
  selector: 'app-detail-tour',
  imports: [CommonModule, FormsModule, MapComponent],
  templateUrl: './detail-tour.component.html',
  styleUrl: './detail-tour.component.scss',
})
export class DetailTourComponent {

  // Thông tin người dùng
  user: User = {
    name: 'Nguyen Van A',
    avatar: '/assets/images/avatar-user.jpg'
  }

  // Lịch trình tour
  itineraryDays: ItineraryDay[] = [
    {
      title: 'Khám phá Đông đảo',
      details: [
        'Tới sân bay Phú Quốc, xe đón du khách đưa đoàn về khách sạn gửi hành lý, tự do nghỉ ngơi.',
        'Ăn trưa đặc sản Phú Quốc với “Gỏi cá Trích” tại nhà hàng và về nhận phòng khách sạn.',
        'Quý khách khởi hành đi tham quan phía Đông đảo: Vườn tiêu Suối đá - Cơ sở ủ rượu vang Sim - Làng chài cổ Hàm Ninh - Dinh Bà, Dinh Cậu.',
        'Quý khách dùng cơm tối và về khách sạn nghỉ ngơi. Tự do dạo bãi biển, thưởng thức không khí yên tĩnh tuyệt vời của thành phố biển đảo.'
      ]
    },
    {
      title: 'Trải nghiệm đảo Hòn Thơm',
      details: [
        'Dùng điểm tâm sáng tại khách sạn.',
        'Di chuyển đến cảng An Thới, đi cáp treo vượt biển dài nhất thế giới để đến Hòn Thơm.',
        'Tự do vui chơi tại công viên nước Aquatopia và các hoạt động bãi biển.',
        'Chiều về lại đất liền, ăn tối tại nhà hàng địa phương và nghỉ đêm tại khách sạn.'
      ]
    },
    {
      title: 'Khám phá Bắc đảo',
      details: [
        'Ăn sáng, khởi hành đi tham quan: Rừng nguyên sinh, Đền thờ Nguyễn Trung Trực, Mũi Gành Dầu.',
        'Ghé thăm VinWonders hoặc Vinpearl Safari (tùy chọn).',
        'Buổi chiều tắm biển tại Bãi Dài – bãi biển hoang sơ tuyệt đẹp.',
        'Tối về khách sạn nghỉ ngơi hoặc tự do khám phá chợ đêm Phú Quốc.'
      ]
    },
    {
      title: 'Tạm biệt Phú Quốc',
      details: [
        'Dùng bữa sáng, làm thủ tục trả phòng khách sạn.',
        'Tự do mua sắm đặc sản tại chợ Dương Đông: nước mắm, hải sản khô, ngọc trai…',
        'Xe đưa đoàn ra sân bay Phú Quốc, chia tay và hẹn gặp lại.'
      ]
    }
  ];

  detailTour: DetailTour = {
    name: 'Phu Quoc Tour',
    description: 'Phú Quốc, hòn đảo lớn nhất Việt Nam, được mệnh danh là "đảo ngọc" với vẻ đẹp hoang sơ, biển xanh cát trắng và hệ sinh thái phong phú. Nằm trong vịnh Thái Lan, Phú Quốc không chỉ thu hút du khách bởi những bãi biển tuyệt đẹp như Bãi Sao, Bãi Dài mà còn bởi nền ẩm thực độc đáo, các khu chợ đêm sôi động và những điểm du lịch hấp dẫn như VinWonders, Safari, cáp treo Hòn Thơm. Đây là điểm đến lý tưởng cho những ai muốn tận hưởng kỳ nghỉ thư giãn và khám phá thiên nhiên.',
    hightlight: [
      'Công Viên Nước Aquatopia - Trải Nghiệm Đi Cáp Treo Vượt Biển - Khám Phá Núi San Hô & Rặng san hô Bán Nguyệt',
      'Khách sạn chuẩn 4 sao AVS Hotel Phu Quoc',
      'Gỏi cá Trích - Nhum biển nướng',
      'Lặn tham quan - Vui chơi tại công viên nước với hơn 100 hoạt động vui chơi'
    ]
  }

  // code cho lịch trình
  totalDays = 4;
  isShowItinerary: boolean[] = [];

  constructor(private router: Router) {
    // Khởi tạo mảng trạng thái theo số ngày của tour
    this.isShowItinerary = Array(this.itineraryDays.length).fill(false);
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

  //hiển thị thêm
  showAllReviews: boolean = false;
  toggleReviews() {
    this.showAllReviews = !this.showAllReviews;
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

    if (!this.startDate.trim()) {
      alert('Vui lòng chọn ngày');
      valid = false;
      return;
    }

    if (valid) {
      const bookingInfo = {
        fullName: this.fullName,
        phoneNumber: this.phoneNumber,
        email: this.email,
        notes: this.notes,
        startDate: this.startDate,
        endDate: this.endDate,
        adults: this.adults,
        children: this.children,
        totalPrice: this.totalPrice
      };
      console.log('Thông tin đặt tour: ', bookingInfo);
      Swal.fire({
        title: 'Thành công!',
        text: 'Bạn đã đặt tour thành công.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // Khi bấm OK -> đóng modal
        const modalElement = document.getElementById('confirmBookingModal');
        if (modalElement) {
          const modalInstance = bootstrap.Modal.getInstance(modalElement);
          modalInstance?.hide();
        }
        this.router.navigate(['/payment']);
      });
    }
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
      name: this.user.name,
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


  // COMBO liên quan
  tours: Tour[] = [{
    title: 'BIỂN ĐẢO 4N3Đ | PHÚ QUỐC (khởi hành mỗi ngày)',
    location: 'đảo Phú Quốc',
    oldPrice: 6000000,
    salePrice: 4900000,
    duration: '4 ngày 3 đêm',
    rating: 4.9
  },
  {
    title: 'BIỂN ĐẢO 4N3Đ | PHÚ QUỐC (khởi hành mỗi ngày)',
    location: 'đảo Phú Quốc',
    oldPrice: 6000000,
    salePrice: 4900000,
    duration: '4 ngày 3 đêm',
    rating: 4.9
  }]

  navigateToDetail() {
    this.router.navigate(['/detail-tour']);
  }

}
