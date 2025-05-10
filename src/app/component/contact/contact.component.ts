import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  messages = [
    { from: 'System', text: 'Hiii! How are you today?' }
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({ from: 'You', text: this.newMessage });
      this.newMessage = '';
      this.messages.push({ from: 'System', text: 'TRAVELAKÀ xin chào quý khách! Cảm ơn quý khách đã gửi phản hồi cho chúng tôi. Vui lòng đợi phản hồi từ Hệ thống trong giây lát...' });
    }
  }

  hoverIndex: number | null = null;

showInfo(index: number) {
  this.hoverIndex = index;
}

hideInfo() {
  this.hoverIndex = null;
}

  zalo = 'Liên hệ: 0912345678';
  phone = 'Số điện thoại: 0987654321';
  instagram = 'Instagram: @travelaka_huce_99';
  facebook = 'Facebook: Travelaka Vietnam';

}
