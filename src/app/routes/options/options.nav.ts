import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-options-nav',
  template: `
    <nav>
      <ul>
        <li *ngFor="let optionEndPoint of optionEndPoints">
          <span
            role="button"
            [class]="optionEndPoint.class"
            (click)="onSelectEndPoint(optionEndPoint.value)"
          >
            {{ optionEndPoint.label }}
          </span>
        </li>
      </ul>
    </nav>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsNav {
  optionEndPoints = [
    {
      label: 'Agency Ranges',
      value: 'agency-ranges',
      class: 'outline secondary',
    },
    {
      label: 'Agency Statuses',
      value: 'agency-statuses',
      class: 'outline secondary',
    },
    { label: 'Trip Kinds', value: 'trip-kinds', class: 'outline secondary' },
    {
      label: 'Trip Statuses',
      value: 'trip-statuses',
      class: 'outline secondary',
    },
  ];

  constructor(private router: Router, private route: ActivatedRoute) {}

  onSelectEndPoint(value: string): void {
    this.optionEndPoints.forEach((optionEndPoint) => {
      optionEndPoint.class =
        optionEndPoint.value === value ? 'outline ' : 'outline secondary';
    });
    this.router.navigate(['.'], {
      relativeTo: this.route,
      queryParams: { endpoint: value },
    });
  }
}
