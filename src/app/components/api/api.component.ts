import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Api } from '@models/api.interface';

@Component({
  selector: 'app-api',
  template: `
    <app-working *ngIf="state.isWorking"></app-working>
    <ng-content *ngIf="state.data.length > 0"></ng-content>
    <app-error *ngIf="state.error" [error]="state.error"></app-error>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiComponent {
  @Input() state: Api<unknown> = { isWorking: false, error: '', data: [] };
}