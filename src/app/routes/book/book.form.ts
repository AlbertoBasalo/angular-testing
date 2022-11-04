import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-form',
  template: `
    <form [formGroup]="form">
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
      <app-options-control
        formControlName="paymentMethod"
        label="Payment Method"
        [options]="paymentMethodOptions"
      >
      </app-options-control>
      <button type="submit" (click)="onSubmit()">Make Trip Booking</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookForm implements OnInit {
  @Input() tripId = '';
  form!: FormGroup;
  paymentMethodOptions = [
    {
      value: 'credit-card',
      label: `Credit Card`,
    },
    {
      value: 'debit-card',
      label: `Debit Card`,
    },
    {
      value: 'wire-transfer',
      label: `Wire Transfer`,
    },
    {
      value: 'cash',
      label: `Cash`,
    },
    {
      value: 'check',
      label: `Check`,
    },
  ];

  constructor(private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: '',
      tripId: this.tripId,
      customer: '',
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
