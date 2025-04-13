import { Component } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  imports: [],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.scss'
})
export class UserDashboardComponent {
  name = 'Nguyễn Văn A';
  rank = 'Silver';
  userName = 'NGVanA123';
  userEmail = 'NguyenA@gmail.com';
  userPhone = '0987654321';

  isCollapsed = false;

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  // partice event
  message = '';
  onInput(event:any) {
    this.message = event.target.value;
  }

  result = '';
  onSearch(keywork: string) {
    this.result = 'ket qua ' + keywork;
  }

}
