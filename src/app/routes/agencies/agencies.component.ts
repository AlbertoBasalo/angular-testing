import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Agency } from '@models/agency.interface';
import { Option } from '@models/option.interface';
import { ApiService } from '@services/api.service';

/*
 * 0️⃣ Minimal rookie implementation:
 * All responsibility on the same place
 * Default change detection strategy
 * Template form
 * Subscription madness
 */

@Component({
  selector: 'app-agencies',
  template: `
    <article>
      <header>Operating with {{ agencies.length }} agencies</header>
      <table role="grid">
        <thead>
          <tr>
            <th><strong>Agency</strong></th>
            <th><strong>Range</strong></th>
            <th><strong>Status</strong></th>
            <th><strong>Delete</strong></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let agency of agencies">
            <td>{{ agency.name }}</td>
            <td>{{ agency.range }}</td>
            <td>{{ agency.status }}</td>
            <td><button (click)="onDeleteClick(agency.id)">🗑️</button></td>
          </tr>
        </tbody>
      </table>
    </article>
    <article>
      <header>Add a new agency</header>
      <form>
        <fieldset>
          <label for="name">Name</label>
          <input type="text" id="name" name="name" [(ngModel)]="agency.name" />
          <label for="range">Range</label>
          <span *ngFor="let option of agencyRanges">
            <input
              type="radio"
              name="range"
              [(ngModel)]="agency.range"
              [id]="option.value"
              [value]="option.value"
            />
            <label [for]="option.value">{{ option.label }}</label>
          </span>
          <label for="status">Status</label>
          <span *ngFor="let option of agencyStatuses">
            <input
              type="radio"
              name="status"
              [(ngModel)]="agency.status"
              [id]="option.value"
              [value]="option.value"
            />
            <label [for]="option.value">{{ option.label }}</label>
          </span>
        </fieldset>
        <button (click)="onSaveClick()">Submit</button>
      </form>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class AgenciesComponent implements OnInit {
  agencies: Agency[] = [];
  agencyRanges: Option[] = [];
  agencyStatuses: Option[] = [];
  agency: Agency = {
    id: '',
    name: '',
    range: '',
    status: '',
  };

  constructor(private api: ApiService) {
    this.loadAgencies();
    this.loadOptions();
  }

  private loadOptions() {
    this.api.getOptions$('agency-ranges').subscribe((ranges) => {
      this.agencyRanges = ranges;
    });
    this.api.getOptions$('agency-statuses').subscribe((statuses) => {
      this.agencyStatuses = statuses;
    });
  }

  ngOnInit(): void {}

  loadAgencies() {
    this.api.getAgencies$().subscribe((agencies) => {
      this.agencies = agencies;
    });
  }

  onSaveClick() {
    this.api.postAgency$(this.agency).subscribe(() => this.loadAgencies());
  }

  onDeleteClick(agencyId: string) {
    this.api.deleteAgency$(agencyId).subscribe(() => this.loadAgencies());
  }
}
