import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <nav>
        <ul>
          <strong [routerLink]="['/']">{{ title }}</strong>
        </ul>
        <ul>
          <li><a [routerLink]="['/', 'agencies']">➡️ Agencies</a></li>
          <li><a [routerLink]="['/', 'trips']">➡️ Trips</a></li>
          <li><a [routerLink]="['/', 'bookings']">➡️ Bookings</a></li>
          <li><a [routerLink]="['/', 'options']">➡️ Options</a></li>
        </ul>
      </nav>
    </header>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  @Input() title = '';
}
