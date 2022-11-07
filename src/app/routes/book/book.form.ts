import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Booking } from '@models/booking.interface';

@Component({
  selector: 'app-book-form',
  template: `
    <form [formGroup]="form">
      <article>
        <app-customer-form formControlName="customer"></app-customer-form>
      </article>
      <article>
        <app-input-control
          formControlName="seats"
          label="Seats"
          type="number"
          [control]="form.get('seats')"
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
      </article>
      <button type="submit" (click)="onSubmit()">Make Trip Booking</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookForm implements OnInit {
  @Input() tripId = '';
  @Input() places = 1;
  @Output() book = new EventEmitter<Booking>();
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
      seats: new FormControl(2, [
        Validators.min(1),
        Validators.max(this.places),
      ]),
      premiumFood: '',
      paymentMethod: new FormControl('credit-card', Validators.required),
      date: new Date().toISOString(),
      status: 'Pending',
    });
  }
  onSubmit() {
    this.book.emit(this.form.value);
  }
}
