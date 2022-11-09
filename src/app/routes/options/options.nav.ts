import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-options-nav',
  template: `
    <nav>
      <ul>
        <li>
          <span role="button" class="outline">Agency Ranges</span>
        </li>
        <li>
          <span role="button" class="outline secondary">Agency Statuses</span>
        </li>
        <li>
          <span role="button" class="outline secondary">Trip Kinds</span>
        </li>
        <li>
          <span role="button" class="outline secondary">Trip Statuses</span>
        </li>
      </ul>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsNav {
  constructor(private router: Router) {}
}
