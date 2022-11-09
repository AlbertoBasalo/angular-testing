import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OptionsService } from './options.service';

/*
 * 3️⃣ Decoupled implementation:
 * Delegated responsibility to presenter components
 * On Push change detection strategy
 * Reactive form
 * Async pipe subscription
 * Using the router as a state management
 * State management delegated to the service
 */

@Component({
  selector: 'app-options',
  template: `
    <app-options-nav></app-options-nav>
    <app-options-list></app-options-list>
    <app-options-form></app-options-form>
  `,
  providers: [OptionsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent implements OnInit {
  constructor(private service: OptionsService, private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
