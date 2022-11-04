import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: ` <aside>{{ kind }} {{ message }}</aside> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorMessageComponent {
  @Input() message = '';
  @Input() kind = '⚠️';
}
