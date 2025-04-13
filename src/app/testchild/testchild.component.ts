import { Component, EventEmitter, Input, input, Output } from '@angular/core';

@Component({
  selector: 'app-testchild',
  imports: [],
  templateUrl: './testchild.component.html',
  styleUrl: './testchild.component.scss'
})
export class TestchildComponent {
  @Input() name='';
  @Output() exportvalue = new EventEmitter<string>();
  constructor() {}
  onClick() {
    this.exportvalue.emit(' message from chid ');
  }
}
