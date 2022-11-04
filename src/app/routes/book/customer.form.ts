import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-customer-form',
  template: `
    <ng-container [formGroup]="form">
      <app-input-control
        formControlName="name"
        label="Name"
      ></app-input-control>
      <app-input-control
        formControlName="email"
        label="Email"
        type="email"
      ></app-input-control>
      <app-input-control
        formControlName="phone"
        label="Phone"
      ></app-input-control>
      <app-input-control
        formControlName="gender"
        label="Gender"
      ></app-input-control>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: CustomerForm, multi: true },
  ],
})
export class CustomerForm implements ControlValueAccessor {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      phone: '',
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
