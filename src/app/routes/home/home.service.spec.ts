import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Trip } from '@models/trip.interface';
import { ApiService } from '@services/api.service';
import { ApiStore } from '@services/api.store';
import { Observable, of } from 'rxjs';

import { HomeService } from './home.service';

// ! session 3
// ! integration test (not e2e)
// ! the TestBed provides its dependencies
describe('The Home Service _integrated_', () => {
  let homeService: HomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // * http client dependency fake (no e2e)
      providers: [HomeService], // * provide dependencies before using it
    });
    homeService = TestBed.inject(HomeService); // * constructed by the framework
  });

  it('should be created', () => {
    // * no constructor call at all
    expect(homeService).toBeTruthy();
  });
});

// ! session 3
// ! unit test
// ! the TestBed provides doubles for all its dependencies

describe('The Home Service _isolated_', () => {
  let homeService: HomeService;

  // * define doubles for the HomeService dependencies
  let apiServiceStub: jasmine.SpyObj<ApiService>; // * an injected dependency
  let apiStoreSpy: jasmine.SpyObj<ApiStore<Trip>>; // * a constructed dependency

  beforeEach(() => {
    // * arrange the apiService stub to be injected
    apiServiceStub = jasmine.createSpyObj('ApiService', ['getTrips$']);
    const output: Observable<Trip[]> = of([]);
    apiServiceStub.getTrips$.and.returnValue(output);

    TestBed.configureTestingModule({
      imports: [], // * no need to import http client double
      providers: [
        HomeService, // * himself
        { provide: ApiService, useValue: apiServiceStub }, // * the IoC stub
      ],
    });
    homeService = TestBed.inject(HomeService);

    // * arrange the apiStore double spy and set it manually
    apiStoreSpy = jasmine.createSpyObj('ApiStore', ['setIsWorking', 'setData']);
    homeService['tripsStore'] = apiStoreSpy;
  });

  it('should be created', () => {
    expect(homeService).toBeTruthy();
  });

  it('should call the api service getTrips$ method on loadTrips', () => {
    homeService.loadTrips();
    expect(apiServiceStub.getTrips$).toHaveBeenCalled();
  });

  it('should call the apiStore setIsWorking  method on loadTrips', () => {
    homeService.loadTrips();
    expect(apiStoreSpy.setIsWorking).toHaveBeenCalled();
  });

  it('should call the api store set data method on loadTrips success', () => {
    homeService.loadTrips();
    const expected: Trip[] = [];
    expect(apiStoreSpy.setData).toHaveBeenCalledWith(expected);
  });
});
