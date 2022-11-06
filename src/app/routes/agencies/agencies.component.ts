import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Agency } from '@models/agency.interface';
import { ApiService } from '@services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agencies',
  template: `
    <table role="grid">
      <thead>
        <tr>
          <th><strong>Agency</strong></th>
          <th><strong>Range</strong></th>
          <th><strong>Status</strong></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let agency of agencies$ | async">
          <td>{{ agency.name }}</td>
          <td>{{ agency.range }}</td>
          <td>{{ agency.status }}</td>
        </tr>
      </tbody>
    </table>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgenciesComponent implements OnInit {
  agencies$: Observable<Agency[]> = this.api.getAgencies$();

  constructor(private api: ApiService) {}

  ngOnInit(): void {}
}
