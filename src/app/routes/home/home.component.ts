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
  isWorking$ = this.homeService.selectIsWorking$();
  trips$ = this.homeService.selectTrips$();
  error$ = this.homeService.selectError$();
  constructor(private homeService: HomeService) {
    this.homeService.loadTrips();
  }
}
