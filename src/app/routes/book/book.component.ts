import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  template: ` <app-book-form [tripId]="tripId"></app-book-form> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {
  tripId = '';
  constructor(route: ActivatedRoute) {
    this.tripId = route.snapshot.paramMap.get('tripId') || '';
  }
}
