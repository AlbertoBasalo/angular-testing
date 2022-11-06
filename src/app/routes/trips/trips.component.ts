import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-trips',
  template: `
    <app-trips-list></app-trips-list>
    <app-trips-form></app-trips-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsComponent {}
