import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trips-list',
  template: `
    <p>
      trips works!
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsList implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
