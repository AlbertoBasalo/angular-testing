import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Api } from '@models/api.interface';

@Component({
  selector: 'app-api',
  template: `
    <app-working-message *ngIf="state.isWorking"></app-working-message>
    <ng-content *ngIf="state.data.length > 0"></ng-content>
    <app-error-message
      *ngIf="state.error"
      kind="⚠️📡"
      [message]="state.error"
    ></app-error-message>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiComponent {
  @Input() state: Api<unknown> = { isWorking: false, error: '', data: [] };
}
