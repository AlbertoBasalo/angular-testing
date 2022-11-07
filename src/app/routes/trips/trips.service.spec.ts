import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TripsService } from './trips.service';

describe('TripsService', () => {
  let service: TripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(TripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
