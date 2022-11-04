import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-error',
  template: ` <aside>{{ kind }} {{ error }}</aside> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorComponent {
  @Input() error = '';
  @Input() kind = '⚠️';
}
