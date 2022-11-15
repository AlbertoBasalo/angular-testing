import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Trip } from '@models/trip.interface';
import { ApiService } from '@services/api.service';
import { ApiStore } from '@services/api.store';
import { Observable, of } from 'rxjs';

import { HomeService } from './home.service';

fdescribe('The Home Service _integrated_', () => {
  let service: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ! http client dependency fake
      providers: [HomeService], // ! provide it before using it
    });
    service = TestBed.inject(HomeService); // ! claimed as a dependency
  });

  it('should be created', () => {
    // ! no constructor call at all
    expect(service).toBeTruthy();
  });
});

describe('The Home Service _isolated_', () => {
  let service: HomeService;
  // ! define doubles for the ApiService dependencies
  let apiServiceSpy: jasmine.SpyObj<ApiService>; // ! an injected dependency
  let apiStoreSpy: jasmine.SpyObj<ApiStore<Trip>>; // ! a constructed dependency
  beforeEach(() => {
    // ! configure spy to be injected
    apiServiceSpy = jasmine.createSpyObj('ApiService', ['getTrips$']);
    const output: Observable<Trip[]> = of([]);
    apiServiceSpy.getTrips$.and.returnValue(output);
    TestBed.configureTestingModule({
      imports: [], // ! no need to import http client double
      providers: [
        HomeService,
        { provide: ApiService, useValue: apiServiceSpy },
      ],
    });
    service = TestBed.inject(HomeService);
    // ! configure spy to be instantiated (add methods as needed)
    apiStoreSpy = jasmine.createSpyObj('ApiStore', ['setIsWorking', 'setData']);
    service['tripsStore'] = apiStoreSpy;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the api service getTrips$ method on loadTrips', () => {
    // Arrange
    // Act
    service.loadTrips();
    // Assert
    expect(apiServiceSpy.getTrips$).toHaveBeenCalled();
  });

  it('should call the apiStore setIsWorking  method on loadTrips', () => {
    // Arrange
    service['tripsStore'] = apiStoreSpy;
    // Act
    service.loadTrips();
    // Assert
    expect(apiStoreSpy.setIsWorking).toHaveBeenCalled();
  });

  it('should call the api store set data method on loadTrips success', () => {
    // Arrange
    const output: Observable<Trip[]> = of([]);
    apiServiceSpy.getTrips$.and.returnValue(output);
    // Act
    service.loadTrips();
    // Assert
    const expected: Trip[] = [];
    expect(apiStoreSpy.setData).toHaveBeenCalledWith(expected);
  });
});
