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
  name = 'Nguyễn Văn A';
  rank = 'Silver';
  userName = 'NGVanA123';
  userEmail = 'NguyenA@gmail.com';
  userPhone = '0987654321';

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
userForm: any;
email: any;
username: any;
phone: any;

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

  // CODE CHO FORM ĐỔI MẬT KHẨU
  isChangeForm = false;

  changePassword() {
    this.isChangeForm = !this.isChangeForm;
  }

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  currentPasswordError: string = '';
  newPasswordError: string = '';
  confirmPasswordError: string = '';

  // Hàm xử lý sự kiện khi form được submit
  onSubmit(): void {
    let valid = true;

    // Reset lỗi
    this.currentPasswordError = '';
    this.newPasswordError = '';
    this.confirmPasswordError = '';

    // Kiểm tra mật khẩu hiện tại
    if (!this.currentPassword) {
      this.currentPasswordError = 'Mật khẩu hiện tại không được bỏ trống.';
      valid = false;
    }

    // Kiểm tra mật khẩu mới
    if (!this.newPassword) {
      this.newPasswordError = 'Mật khẩu mới không được bỏ trống.';
      valid = false;
    } else if (this.newPassword.length < 6) {
      this.newPasswordError = 'Mật khẩu mới phải có ít nhất 6 ký tự.';
      valid = false;
    }

    // Kiểm tra mật khẩu nhập lại
    if (this.newPassword !== this.confirmPassword) {
      this.confirmPasswordError = 'Mật khẩu nhập lại không khớp.';
      valid = false;
    }

    // Nếu tất cả hợp lệ, hiển thị thông báo thành công
    if (valid) {
      alert('Đổi mật khẩu thành công!');
    }
  }

  // Hàm xử lý khi người dùng bấm nút hủy
  onCancel(): void {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
    this.currentPasswordError = '';
    this.newPasswordError = '';
    this.confirmPasswordError = '';
  }

  // Hàm xử lý lưu thông tin thay đổi
  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  phonePattern = /^0\d{9,10}$/;
  userNamePattern = /^[a-zA-Z0-9_]+$/;
  // biến để lưu tạm các giá trị
  userName1 = this.userName;
  userPhone1 = this.userPhone;
  userEmail1 = this.userEmail;

  logUserEmail() {
    let valid = true;

    if (!this.emailPattern.test(this.userEmail)) {
      alert('Email không hợp lệ, vui lòng nhập lại email!');
      this.userEmail = this.userEmail1;
      valid = false;
    }
    if (!this.phonePattern.test(this.userPhone)) {
      alert('Số điện thoại không hợp lệ, vui lòng nhập lại bắt đầu bằng số 0!');
      this.userPhone = this.userPhone1
      valid = false;
    }
    if (!this.userNamePattern.test(this.userName)) {
      alert('Tên đăng nhập không hợp lệ, vui lòng nhập lại!');
      valid = false;
      this.userName = this.userName1;
    }
    if (valid) {
      this.userEmail1 = this.userEmail;
      this.userName1 = this.userName;
      this.userPhone1 = this.userPhone;
      alert('Lưu thông tin thành công');
    }
  }

}

