import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HomeService } from '../home.service';

@Component({
  template: `
    <aside *ngIf="isWorking$ | async" aria-busy="true">Loading...</aside>
    <app-trips-list
      *ngIf="trips$ | async as trips"
      [trips]="trips"
    ></app-trips-list>
    <aside *ngIf="error$ | async as error">⚠️ {{ error }}</aside>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  // ToDo: extract working and error to components

  isWorking$ = this.service.selectIsWorking$();
  trips$ = this.service.selectTrips$();
  error$ = this.service.selectError$();
  constructor(private service: HomeService) {
    this.service.loadTrips();
  }
}
