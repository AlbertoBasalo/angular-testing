import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book',
  template: ` <app-book-form></app-book-form> ID:{{ tripId }} `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent {
  tripId = '';
  constructor(route: ActivatedRoute) {
    this.tripId = route.snapshot.paramMap.get('tripId') || '';
  }
}
