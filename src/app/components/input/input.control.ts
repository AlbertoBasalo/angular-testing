import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input-control',
  template: `
    <div>
      <label [for]="formControlName">{{ label | uppercase }}</label>
      <small *ngIf="mustShowError()">
        {{ getErrorMessage() }}
      </small>
      <input
        [id]="formControlName"
        [name]="formControlName"
        [type]="type"
        [placeholder]="label"
        [value]="value"
        [attr.aria-invalid]="hasError()"
        [disabled]="isDisabled"
        (blur)="touchedCallback()"
        (change)="onChange($event)"
        (keyUp)="onChange($event)"
      />
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputControl),
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
  registerOnChange(changeCallBack: (nv: any) => void): void {
    this.changeCallback = changeCallBack;
  }
  registerOnTouched(touchedCallback: () => void): void {
    this.touchedCallback = touchedCallback;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
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
