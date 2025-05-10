import { Component, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-introduction',
  imports: [CommonModule],
  templateUrl: './introduction.component.html',
  styleUrl: './introduction.component.scss'
})
export class IntroductionComponent {
  @HostBinding('class.animate') animate = true;
}
