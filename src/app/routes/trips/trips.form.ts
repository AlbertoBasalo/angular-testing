import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Agency } from '@models/agency.interface';
import { Trip } from '@models/trip.interface';

@Component({
  selector: 'app-trips-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <label>Destination</label>
      <input type="text" formControlName="destination" />
      <label>Agency</label>

      <select formControlName="agencyId">
        <option *ngFor="let agency of agencies" [value]="agency.id">
          {{ agency.name }}
        </option>
      </select>
      <label>Departure</label>
      <input type="date" formControlName="startDate" />
      <button type="submit">Submit</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsForm {
  @Input() agencies: Agency[] = [];
  @Output() save = new EventEmitter<Partial<Trip>>();
  form = this.formBuilder.group({
    destination: '',
    agencyId: '',
    startDate: '',
  });
  constructor(private formBuilder: FormBuilder) {}

  onSubmit() {
    this.save.emit(this.form.value as Partial<Trip>);
    this.form.reset();
  }
}
