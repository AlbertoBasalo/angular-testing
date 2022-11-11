import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { Option } from '../../models/option.interface';

@Component({
  selector: 'app-options-control',
  template: `
    <div>
      <span *ngIf="isRequired()" aria-label="required">❕</span>
      <span>{{ getLabel() }}</span>
      <small *ngIf="mustShowError()">
        {{ getErrorMessage() }}
      </small>
      <ng-container *ngIf="options.length > 3; then select; else radios">
      </ng-container>
    </div>
    <ng-template #select>
      <select [id]="formControlName" (change)="onChange($event)">
        <option value="" selected>Choose one option 👇🏼</option>
        <option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </option>
      </select>
    </ng-template>
    <ng-template #radios>
      <span *ngFor="let option of options">
        <input
          type="radio"
          [name]="formControlName"
          [id]="option.value"
          [value]="option.value"
          (click)="onChange($event)"
        />
        <label [for]="option.value">{{ option.label }}</label>
      </span>
    </ng-template>
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
  @Input() options: Option[] = [];
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
