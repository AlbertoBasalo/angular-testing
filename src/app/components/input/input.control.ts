import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-input-control',
  template: `
    <div>
      <label [for]="formControlName">
        <span *ngIf="isRequired()" aria-label="required">❕</span>
        <span>{{ getLabel() }}</span>
        <input
          [id]="formControlName"
          [name]="formControlName"
          [type]="type"
          [placeholder]="label"
          [value]="value"
          [disabled]="isDisabled"
          [attr.aria-invalid]="hasError()"
          (blur)="touchedCallback()"
          (change)="onChange($event)"
          (keyup)="onChange($event)"
        />
        <small *ngIf="mustShowError()">
          {{ getErrorMessage() }}
        </small>
      </label>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputControl,
      multi: true,
    },
  ],
})
export class InputControl implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() formControlName: string = '';
  @Input() control!: AbstractControl | null;
  @Input() type: 'text' | 'password' | 'email' | 'tel' | 'number' | 'checkbox' =
    'text';

  value: any;
  isDisabled: boolean = false;
  changeCallback!: (value: any) => void;
  touchedCallback!: () => void;

  onChange(event: any) {
    const value = event.target.value;
    this.changeCallback(value);
    this.touchedCallback();
  }

  writeValue(value: any): void {
    this.value = value;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  registerOnChange(changeCallBack: (nv: any) => void): void {
    this.changeCallback = changeCallBack;
  }
  registerOnTouched(touchedCallback: () => void): void {
    this.touchedCallback = touchedCallback;
  }

  getLabel() {
    let label = this.label || this.formControlName;
    if (!this.label.trim().endsWith(':')) {
      label += ':';
    }
    return label.toUpperCase();
  }
  isRequired(): boolean {
    return this.control?.hasValidator(Validators.required) || false;
  }

  hasError(): boolean {
    return this.control?.invalid || false;
  }
  mustShowError(): boolean {
    return (this.control?.touched && this.control?.invalid) || false;
  }
  getErrorMessage(): string {
    return JSON.stringify(this.control?.errors) || '';
  }
}
