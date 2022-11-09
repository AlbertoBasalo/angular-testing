import { ChangeDetectionStrategy, Component } from '@angular/core';

/*
 * 4️⃣ Reactive implementation:
 * Delegated responsibility to smart components
 * On Push change detection strategy
 * Reactive form
 * Async pipe subscription
 * State management delegated to the service with Stores
 */

@Component({
  selector: 'app-trips',
  template: `
    <app-trips-list></app-trips-list>
    <app-trips-form></app-trips-form>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripsComponent {}
