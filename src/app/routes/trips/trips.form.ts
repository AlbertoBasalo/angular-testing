import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Trip } from '@models/trip.interface';
import { TripsService } from './trips.service';

@Component({
  selector: 'app-trips-form',
  template: `
    <ng-container *ngIf="agenciesState$ | async as agenciesState">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <label>Destination</label>
        <input type="text" formControlName="destination" />
        <label>Agency</label>
        <select formControlName="agencyId">
          <option *ngFor="let agency of agenciesState.data" [value]="agency.id">
            {{ agency.name }}
          </option>
        </select>
        <label>Departure</label>
        <input type="date" formControlName="startDate" />
        <button type="submit">Submit</button>
      </form>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsForm {
  agenciesState$ = this.service.selectAgenciesState$();

  form = this.formBuilder.group({
    destination: '',
    agencyId: '',
    startDate: '',
  });
  constructor(private service: TripsService, private formBuilder: FormBuilder) {
    this.service.loadAgencies();
  }

  onSubmit() {
    const trip = this.form.value as Partial<Trip>;
    this.service.saveTrip(trip);
    this.form.reset();
  }
}
