import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trips-form',
  template: `
    <p>
      trips works!
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TripsForm implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
