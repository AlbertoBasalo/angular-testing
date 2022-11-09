import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Option } from '@models/option.interface';
@Component({
  selector: 'app-options-form',
  template: `
    <form [formGroup]="form">
      <legend>Add new options</legend>
      <fieldset class="grid">
        <label for="label">
          Label:
          <input type="text" id="label" name="label" formControlName="label" />
        </label>
        <label for="value">
          Value:
          <input type="text" id="value" name="value" formControlName="value" />
        </label>
      </fieldset>
      <button type="submit" (click)="save.emit(this.form.value)">
        Save new Option
      </button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsForm {
  @Output() save = new EventEmitter<Partial<Option>>();
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      label: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required]),
    });
  }
}
