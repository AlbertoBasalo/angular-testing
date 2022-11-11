import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  template: `
    <ng-container [formGroup]="form">
      <app-input-control
        formControlName="name"
        label="Full name"
        [control]="form.get('name')"
      >
      </app-input-control>
      <app-input-control
        formControlName="email"
        label="Email address"
        type="email"
        [control]="form.get('email')"
      ></app-input-control>
      <app-input-control
        formControlName="phone"
        label="Phone number"
        type="tel"
        [control]="form.get('phone')"
      ></app-input-control>
      <app-options-control
        formControlName="gender"
        label="Gender"
        [options]="genderOptions"
      >
      </app-options-control>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CustomerForm, multi: true },
  ],
})
export class CustomerForm implements ControlValueAccessor {
  form: FormGroup;
  genderOptions = [
    {
      value: 'male',
      label: `Male`,
    },
    {
      value: 'female',
      label: `Female`,
    },
  ];

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
      gender: '',
    });
  }

  touchedCallback!: () => void;

  writeValue(value: any): void {
    value && this.form.setValue(value);
  }
  registerOnChange(changeCallBack: (nv: any) => void): void {
    this.form.valueChanges.subscribe(changeCallBack);
  }
  registerOnTouched(touchedCallback: () => void): void {
    this.touchedCallback = touchedCallback;
  }
  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }
}
