import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options-list',
  template: `
    <ul>
      <li>options list!</li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsList implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
