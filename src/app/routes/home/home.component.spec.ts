import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Trip } from '@models/trip.interface';
import { ApiService } from '@services/api.service';
import { HomeComponent } from './home.component';
import { HomeService } from './home.service';

// ! session 4
// ! component dependencies

const trip: Trip = {
  id: '1',
  agencyId: 'Trip 1',
  agencyTripCode: 'Trip 1',
  destination: 'Trip 1 description',
  places: 10,
  startDate: '2020-01-01',
  flightPrice: 100,
  stayingNightPrice: 100,
  kind: 'Trip 1',
  status: 'active',
  extraLuggagePricePerKilo: 100,
  premiumFoodPrice: 100,
  endDate: '2020-01-01',
};

describe('The Home Component with integration', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule], // * still need to import the http client module
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

describe('The Home Component with nested dependencies', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  // * this is the double stub for the nested dependency
  let apiServiceStub: jasmine.SpyObj<ApiService>;
  beforeEach(async () => {
    apiServiceStub = jasmine.createSpyObj('ApiService', ['getTrips$']);
    apiServiceStub.getTrips$.and.returnValue(of([trip]));
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [], // * no http client dependency double
      providers: [{ provide: ApiService, useValue: apiServiceStub }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class HomeServiceStub {
  loadTrips() {}
  selectTrips$() {
    return of({ isWorking: false, error: '', data: [trip] });
  }
}

describe('The Home Component with testBed overriding providers', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [], // * no http client dependency double
      providers: [], // * provider stub for modules
      schemas: [NO_ERRORS_SCHEMA],
    })
      .overrideComponent(HomeComponent, {
        set: {
          // * overriding the providers takes precedence over the testBed providers
          providers: [{ provide: HomeService, useClass: HomeServiceStub }],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
