import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  template: `
    <form [formGroup]="form">
      <app-input-control
        formControlName="tripId"
        label="Trip ID"
      ></app-input-control>
      <app-customer-form formControlName="customer"></app-customer-form>
      <app-input-control
        formControlName="seats"
        label="Seats"
        type="number"
      ></app-input-control>
      <app-input-control
        formControlName="premiumFood"
        label="Premium Food"
        type="checkbox"
      ></app-input-control>
      <button type="submit" (click)="onSubmit()">Make Trip Booking</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookForm implements OnInit {
  @Input() tripId = '';
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: '',
      tripId: new FormControl({ value: this.tripId, disabled: true }),
      customer: new FormControl(''),
      seats: 1,
      premiumFood: '',
      paymentMethod: '',
      date: new Date().toISOString(),
      status: 'Pending',
    });
  }
  onSubmit() {
    console.log(this.form.value);
  }
}
