import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <h1>{{ title }}</h1>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() title = '';
}
