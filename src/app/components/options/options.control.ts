import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-options-control',
  template: `
    <div>
      <label [for]="formControlName">{{ label | uppercase }}</label>
      <small *ngIf="mustShowError()">
        {{ getErrorMessage() }}
      </small>
      <select [id]="formControlName" (change)="onChange($event)">
        <option value="" selected>Choose one option 👇🏼</option>
        <option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </option>
      </select>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: NG_VALUE_ACCESSOR, useExisting: OptionsControl, multi: true },
  ],
})
export class OptionsControl implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() formControlName: string = '';
  @Input() control!: AbstractControl | null;
  @Input() options: { value: string; label: string }[] = [];
  // ToDo: change select for a radio button group when the options are 3 or less

  value: any;
  isDisabled: boolean = false;
  changeCallback!: (value: any) => void;
  touchedCallback!: () => void;

  onChange(event: any) {
    const value = event.target.value;
    this.changeCallback(value);
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
