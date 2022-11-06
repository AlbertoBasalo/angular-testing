import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Agency } from '@models/agency.interface';
import { ApiService } from '@services/api.service';
import { UtilsService } from '@services/utils.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agencies',
  template: `
    <article *ngIf="agencies$ | async as agencies">
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
      <form [formGroup]="form">
        <label for="name">Name</label>
        <input type="text" id="name" name="name" formControlName="name" />
        <label for="range">Range</label>
        <input type="text" id="range" name="range" formControlName="range" />
        <label for="status">Status</label>
        <input type="text" id="status" name="status" formControlName="status" />
        <button (click)="onSaveClick()">Submit</button>
      </form>
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AgenciesComponent implements OnInit {
  agencies$: Observable<Agency[]> = this.api.getAgencies$();
  form = this.formBuilder.group({
    name: '',
    range: 'Orbital',
    status: 'Pending',
  });
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private utils: UtilsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onApiSuccess() {
    this.agencies$ = this.api.getAgencies$();
    this.form.reset();
    this.cdr.detectChanges();
  }

  onSaveClick() {
    const agencyForm = this.form.value as Agency;
    const agencyId = this.utils.slugify(agencyForm.name);
    const newAgency: Agency = { ...agencyForm, id: agencyId };
    this.api.postAgency$(newAgency).subscribe(() => this.onApiSuccess());
  }

  onDeleteClick(agencyId: string) {
    this.api.deleteAgency$(agencyId).subscribe(() => this.onApiSuccess());
  }
}
