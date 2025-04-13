import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  isRegisterMode = false;
  toggle() {
    this.isRegisterMode = !this.isRegisterMode;
  }
}
