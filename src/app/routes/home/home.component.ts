import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  template: `
    <app-working-message *ngIf="isWorking$ | async"></app-working-message>
    <app-trips-list
      *ngIf="trips$ | async as trips"
      [trips]="trips"
    ></app-trips-list>
    <aside *ngIf="error$ | async as error">⚠️ {{ error }}</aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  isWorking$ = this.service.selectIsWorking$();
  trips$ = this.service.selectTrips$();
  error$ = this.service.selectError$();
  constructor(private service: HomeService) {
    this.service.loadTrips();
  }
}
