import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Trip } from '@models/trip.interface';
import { ApiService } from '@services/api.service';
import { ApiStore } from '@services/api.store';
import { Observable, of } from 'rxjs';

import { HomeService } from './home.service';

fdescribe('The Home Service _integrated_', () => {
  let sut: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // ! http client dependency fake
      providers: [HomeService], // ! provide it before using it
    });
    sut = TestBed.inject(HomeService); // ! claimed as a dependency
  });

  it('should be created', () => {
    // ! no constructor call at all
    expect(sut).toBeTruthy();
  });
});

describe('The Home Service _isolated_', () => {
  let sut: HomeService;
  // ! define doubles for the ApiService dependencies
  let apiServiceStub: jasmine.SpyObj<ApiService>; // ! an injected dependency
  let apiStoreSpy: jasmine.SpyObj<ApiStore<Trip>>; // ! a constructed dependency
  beforeEach(() => {
    // ! configure spy to be injected
    apiServiceStub = jasmine.createSpyObj('ApiService', ['getTrips$']);
    const output: Observable<Trip[]> = of([]);
    apiServiceStub.getTrips$.and.returnValue(output);
    TestBed.configureTestingModule({
      imports: [], // ! no need to import http client double
      providers: [
        HomeService,
        { provide: ApiService, useValue: apiServiceStub },
      ],
    });
    sut = TestBed.inject(HomeService);
    // ! configure spy to be instantiated (add methods as needed)
    apiStoreSpy = jasmine.createSpyObj('ApiStore', ['setIsWorking', 'setData']);
    sut['tripsStore'] = apiStoreSpy;
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('should call the api service getTrips$ method on loadTrips', () => {
    // Arrange
    // Act
    sut.loadTrips();
    // Assert
    expect(apiServiceStub.getTrips$).toHaveBeenCalled();
  });

  it('should call the apiStore setIsWorking  method on loadTrips', () => {
    // Arrange
    sut['tripsStore'] = apiStoreSpy;
    // Act
    sut.loadTrips();
    // Assert
    expect(apiStoreSpy.setIsWorking).toHaveBeenCalled();
  });

  it('should call the api store set data method on loadTrips success', () => {
    // Arrange
    const output: Observable<Trip[]> = of([]);
    apiServiceStub.getTrips$.and.returnValue(output);
    // Act
    sut.loadTrips();
    // Assert
    const expected: Trip[] = [];
    expect(apiStoreSpy.setData).toHaveBeenCalledWith(expected);
  });
});
