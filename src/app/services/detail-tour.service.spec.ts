import { TestBed } from '@angular/core/testing';

import { DetailTourService } from './detail-tour.service';

describe('DetailTourService', () => {
  let service: DetailTourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailTourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
