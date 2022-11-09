import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-options-nav',
  template: ` <nav>Options chooser</nav> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsNav implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
