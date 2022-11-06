import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Api, API_INITIAL_STATE } from '@models/api.interface';

@Component({
  selector: 'app-api',
  template: `
    <app-working *ngIf="state.isWorking"></app-working>
    <app-error *ngIf="state.error" [error]="state.error"></app-error>
    <ng-content></ng-content>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiComponent {
  @Input() state: Api<unknown> = API_INITIAL_STATE;
}
