import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VnpayReturnComponent } from './vnpay-return.component';

describe('VnpayReturnComponent', () => {
  let component: VnpayReturnComponent;
  let fixture: ComponentFixture<VnpayReturnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VnpayReturnComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VnpayReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
