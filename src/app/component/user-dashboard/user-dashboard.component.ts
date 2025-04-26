import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  userInfo = {
    name: 'Nguyễn Văn A',
    avatar: '/assets/images/avatar-user.jpg',
    rank: 'Silver',
    userName: 'NGVanA123',
    userEmail: 'NguyenA@gmail.com',
    userPhone: '0987654321'
  }

  bookings = [
    {
      date: '2025-03-15',
      tourName: 'Du lịch Đà Lạt 3N2Đ',
      people: 2,
      price: 5000000
    },
    {
      date: '2025-03-15',
      tourName: 'Du lịch Đà Lạt 3N2Đ',
      people: 2,
      price: 5000000
    },
    {
      date: '2025-03-15',
      tourName: 'Du lịch Đà Lạt 3N2Đ',
      people: 2,
      price: 5000000
    },
    {
      date: '2025-03-15',
      tourName: 'Du lịch Đà Lạt 3N2Đ',
      people: 2,
      price: 5000000
    },
    {
      date: '2025-03-15',
      tourName: 'Du lịch Đà Lạt 3N2Đ',
      people: 2,
      price: 5000000
    },
    {
      date: '2025-03-15',
      tourName: 'Du lịch Đà Lạt 3N2Đ',
      people: 2,
      price: 5000000
    },
    {
      date: '2025-02-20',
      tourName: 'Tour miền Tây 2N1Đ',
      people: 4,
      price: 3200000
    },
    {
      date: '2025-01-10',
      tourName: 'Phú Quốc nghỉ dưỡng 4N3Đ',
      people: 3,
      price: 9000000
    }
  ];

  //code chuyen trang
  isProfile = true;
  isHistory = false;
  isEdit = false;

  toggleHistory() {
    this.isHistory = true;
    this.isProfile = false;
    this.isEdit = false;
  }
  toggleProfile() {
    this.isHistory = false;
    this.isProfile = true;
    this.isEdit = false;
  }
  toggleEdit() {
    this.isHistory = false;
    this.isProfile = false;
    this.isEdit = true;
  }


  //code cho chinh sua
  focusInput(input: HTMLInputElement): void {
    input.removeAttribute('readonly');
    input.focus();
  }

  // code đăng xuất
  constructor(private router: Router) { }

  logout() {
    this.router.navigate(['/register']); // thay bằng route bạn muốn
  }

  changePassword() {
    this.router.navigate(['/change-password']);
  }

  // Hàm xử lý lưu thông tin thay đổi
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  phonePattern = /^0\d{9,10}$/;
  userNamePattern = /^[a-zA-Z0-9_]+$/;
  // biến để lưu tạm các giá trị
  userName1 = this.userInfo.userName;
  userPhone1 = this.userInfo.userPhone;
  userEmail1 = this.userInfo.userEmail;

  logUserEmail() {
    let valid = true;

    if (!this.emailPattern.test(this.userInfo.userEmail)) {
      alert('Email không hợp lệ, vui lòng nhập lại email!');
      this.userInfo.userEmail = this.userEmail1;
      valid = false;
    }
    if (!this.phonePattern.test(this.userInfo.userPhone)) {
      alert('Số điện thoại không hợp lệ, vui lòng nhập lại bắt đầu bằng số 0!');
      this.userInfo.userPhone = this.userPhone1
      valid = false;
    }
    if (!this.userNamePattern.test(this.userInfo.userName)) {
      alert('Tên đăng nhập không hợp lệ, vui lòng nhập lại!');
      valid = false;
      this.userInfo.userName = this.userName1;
    }
    if (valid) {
      this.userEmail1 = this.userInfo.userEmail;
      this.userName1 = this.userInfo.userName;
      this.userPhone1 = this.userInfo.userPhone;
      alert('Lưu thông tin thành công');
    }
  }

}

