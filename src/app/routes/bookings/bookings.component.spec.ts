import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Booking } from '@models/booking.interface';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';

import { BookingsComponent } from './bookings.component';

// ! session 4
// ! component view test
// ! isolated from the ApiService

// ToDo: student task

describe('The Bookings Component', () => {
  let component: BookingsComponent;
  let fixture: ComponentFixture<BookingsComponent>;
  const inputBookings: Booking[] = [
    {
      id: '1',
      tripId: '1',
      customer: {
        name: 'John Doe',
        email: 'john@acme.org',
        phone: '123456789',
        gender: 'male',
      },
      seats: 1,
      premiumFood: false,
      paymentMethod: 'cash',
      date: '2021-01-01',
      status: 'pending',
    },
  ];
  beforeEach(() => {
    //* define api service double stub
    const apiServiceStub = {
      getBookings$: () => of(inputBookings),
      deleteBooking$: () => of({}),
    };
    TestBed.configureTestingModule({
      declarations: [BookingsComponent],
      imports: [HttpClientTestingModule], // * http client dependency double
      providers: [{ provide: ApiService, useValue: apiServiceStub }], // * inject api service dependency double
    }).compileComponents();

    fixture = TestBed.createComponent(BookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present a table with bookings', () => {
    const debugEl = fixture.debugElement;
    const bookingsTable = debugEl.queryAll(By.css('table'))[0];
    expect(bookingsTable).toBeTruthy();
    let bookingsRows = debugEl.queryAll(By.css('tbody>tr'));
    expect(bookingsRows.length).toBe(inputBookings.length);
  });

  it('should call onDeleteClick on delete button click', () => {
    spyOn(component, 'onDeleteClick');
    const debugEl = fixture.debugElement;
    const deleteButtons = debugEl.queryAll(By.css('tbody>tr>td>button'));
    const firstButton = deleteButtons[0];
    firstButton.triggerEventHandler('click', null);
    expect(component.onDeleteClick).toHaveBeenCalledWith(inputBookings[0].id);
  });

  it('should reload bookings after delete', () => {
    const debug = fixture.debugElement;
    spyOn(component, 'loadBookings');
    const deleteButtons = debug.queryAll(By.css('tbody>tr>td>button'));
    const firstButton = deleteButtons[0];
    firstButton.triggerEventHandler('click', null);
    expect(component.loadBookings).toHaveBeenCalled();
  });

  it('should call onDeleteClick for each delete click booking', () => {
    const debug = fixture.debugElement;
    spyOn(component, 'onDeleteClick');
    const deleteButtons = debug.queryAll(By.css('tbody>tr>td>button'));
    deleteButtons.forEach((button, index) => {
      button.triggerEventHandler('click', null);
      expect(component.onDeleteClick).toHaveBeenCalledWith(
        inputBookings[index].id
      );
    });
  });
});
