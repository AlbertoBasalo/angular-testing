import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Agency } from '@models/agency.interface';
import { Booking } from '@models/booking.interface';
import { Option } from '@models/option.interface';
import { Trip } from '@models/trip.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private agenciesUrl = `${environment.apiServerUrl}/agencies`;
  private bookingsUrl = `${environment.apiServerUrl}/bookings`;
  private tripsUrl = `${environment.apiServerUrl}/trips`;

  constructor(private http: HttpClient, private utilsService: UtilsService) {}

  // ToDo: create generic methods

  getAgencies$(): Observable<Agency[]> {
    return this.http.get<Agency[]>(this.agenciesUrl);
  }
  getAgencyById$(agencyId: string): Observable<Agency> {
    return this.http.get<Agency>(`${this.agenciesUrl}/${agencyId}`);
  }
  postAgency$(agency: Agency): Observable<Agency> {
    agency.id = this.utilsService.getHyphened(agency.name);
    return this.http.post<Agency>(this.agenciesUrl, agency);
  }
  deleteAgency$(agencyId: string): Observable<Agency> {
    return this.http.delete<Agency>(`${this.agenciesUrl}/${agencyId}`);
  }

  getBookings$(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingsUrl);
  }
  getBookingById$(bookingId: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.bookingsUrl}/${bookingId}`);
  }
  postBooking$(booking: Booking): Observable<Booking> {
    const bookingId = `${booking.tripId}_${booking.customer.email}`;
    booking.id = this.utilsService.getHyphened(bookingId);
    return this.http.post<Booking>(this.bookingsUrl, booking);
  }
  deleteBooking$(bookingId: string): Observable<Booking> {
    return this.http.delete<Booking>(`${this.bookingsUrl}/${bookingId}`);
  }

  getTrips$(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.tripsUrl);
  }
  getTripById$(tripId: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.tripsUrl}/${tripId}`);
  }
  postTrip$(trip: Partial<Trip>): Observable<Trip> {
    const tripId = `${trip.agencyId}_${trip.destination}_${trip.startDate}`;
    trip.id = this.utilsService.getHyphened(tripId);
    return this.http.post<Trip>(this.tripsUrl, trip);
  }
  deleteTrip$(tripId: string): Observable<Trip> {
    return this.http.delete<Trip>(`${this.tripsUrl}/${tripId}`);
  }

  getOptions$(resource: string): Observable<Option[]> {
    return this.http.get<Option[]>(`${environment.apiServerUrl}/${resource}`);
  }
  postOption$(resource: string, option: Partial<Option>): Observable<Option> {
    option.id = this.utilsService.getHyphened(option.label || '');
    return this.http.post<Option>(
      `${environment.apiServerUrl}/${resource}`,
      option
    );
  }
  deleteOption$(resource: string, optionId: string): Observable<Option> {
    return this.http.delete<Option>(
      `${environment.apiServerUrl}/${resource}/${optionId}`
    );
  }
}
