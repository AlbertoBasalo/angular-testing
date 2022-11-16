import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Booking } from '@models/booking.interface';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';

import { BookingsComponent } from './bookings.component';

describe('BookingsComponent', () => {
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
  beforeEach(async () => {
    const apiServiceStub = {
      getBookings$: () => of(inputBookings),
      deleteBooking$: () => of({}),
    };
    await TestBed.configureTestingModule({
      declarations: [BookingsComponent],
      imports: [HttpClientTestingModule], // ! http client dependency double
      providers: [{ provide: ApiService, useValue: apiServiceStub }], // ! api service dependency double
    }).compileComponents();

    fixture = TestBed.createComponent(BookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // should present a table with bookings
  it('should present a table with bookings', () => {
    // Arrange
    const debug = fixture.debugElement;
    // Act
    const actualTable = debug.queryAll(By.css('table'))[0];
    // Assert
    expect(actualTable).toBeTruthy();
    let actualBodyRows = debug.queryAll(By.css('tbody>tr'));
    const actualBodyRowsLength = actualBodyRows.length;
    const expectedBodyRowsLength = inputBookings.length;
    expect(actualBodyRowsLength).toBe(expectedBodyRowsLength);
  });

  it('should call onDeleteClick on delete button click', () => {
    // Arrange
    spyOn(component, 'onDeleteClick');
    const debug = fixture.debugElement;
    // Act
    const actualDeleteButtons = debug.queryAll(By.css('tbody>tr>td>button'));
    const firstButton = actualDeleteButtons[0];
    firstButton.triggerEventHandler('click', null);
    const expected = inputBookings[0].id;
    // Assert
    expect(component.onDeleteClick).toHaveBeenCalledWith(expected);
  });

  // should reload bookings after delete
  it('should reload bookings after delete', () => {
    // Arrange
    const debug = fixture.debugElement;
    spyOn(component, 'loadBookings');
    // Act
    const actualDeleteButtons = debug.queryAll(By.css('tbody>tr>td>button'));
    const firstButton = actualDeleteButtons[0];
    firstButton.triggerEventHandler('click', null);
    // Assert
    expect(component.loadBookings).toHaveBeenCalled();
  });
});
