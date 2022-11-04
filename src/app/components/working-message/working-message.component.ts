import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-working-message',
  template: ` <aside aria-busy="true">Loading...</aside> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkingMessageComponent {}
