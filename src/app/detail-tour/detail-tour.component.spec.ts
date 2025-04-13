import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTourComponent } from './detail-tour.component';

describe('DetailTourComponent', () => {
  let component: DetailTourComponent;
  let fixture: ComponentFixture<DetailTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailTourComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
