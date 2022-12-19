import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HttpClientTestingModule } from '@angular/common/http/testing';
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

describe('The Home Component with simple fake imports', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let homeServiceStub: jasmine.SpyObj<HomeService>;
  beforeEach(() => {
    homeServiceStub = jasmine.createSpyObj('HomeService', [
      'loadTrips',
      'selectTrips$',
    ]);
    homeServiceStub.loadTrips.and.callThrough();
    homeServiceStub.selectTrips$.and.returnValue(
      of({ isWorking: false, error: '', data: [trip] })
    );
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [HttpClientTestingModule], // * still need to import the http client module
      providers: [{ provide: HomeService, useValue: homeServiceStub }],
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
  let homeServiceStub: jasmine.SpyObj<HomeService>;
  // * this is the double stub for the nested dependency
  let apiServiceStub: jasmine.SpyObj<ApiService>;
  beforeEach(async () => {
    homeServiceStub = jasmine.createSpyObj('HomeService', [
      'loadTrips',
      'selectTrips$',
    ]);
    homeServiceStub.loadTrips.and.returnValue();

    homeServiceStub.selectTrips$.and.returnValue(
      of({ isWorking: false, error: '', data: [trip] })
    );
    apiServiceStub = jasmine.createSpyObj('ApiService', ['getTrips$']);
    apiServiceStub.getTrips$.and.returnValue(of([trip]));
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [], // * no http client dependency double
      providers: [
        { provide: HomeService, useValue: homeServiceStub },
        { provide: ApiService, useValue: apiServiceStub },
      ],
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

describe('The Home Component with testBed providers', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [], // * no http client dependency double
      providers: [], // * provider stub
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
