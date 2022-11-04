import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeService } from './home.service';

@Component({
  template: `
    <app-api *ngIf="state$ | async as state" [state]="state">
      <app-trips-list [trips]="state.data"></app-trips-list>
    </app-api>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  state$ = this.service.selectState$();

  constructor(private service: HomeService) {
    this.service.loadTrips();
  }
}
