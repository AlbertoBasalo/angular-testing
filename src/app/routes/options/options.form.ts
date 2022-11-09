import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options-form',
  template: `
    <form>
      <legend>new options form</legend>
      <fieldset></fieldset>
      <button type="submit">Submit</button>
    </form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsForm implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
