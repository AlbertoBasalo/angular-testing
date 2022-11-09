import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Option } from '@models/option.interface';
@Component({
  selector: 'app-options-form',
  template: `
    <form>
      <legend>Add new options</legend>
      <fieldset class="grid">
        <label for="label">
          Label:
          <input type="text" id="label" name="label" />
        </label>
        <label for="value">
          Value:
          <input type="text" id="value" name="value" />
        </label>
      </fieldset>
      <button type="submit">Save new Option</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsForm {
  @Output() save = new EventEmitter<Option>();
  constructor(private formBuilder: FormBuilder) {}
}
