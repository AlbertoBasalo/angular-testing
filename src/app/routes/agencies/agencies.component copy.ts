// import {
//   ChangeDetectionStrategy,
//   ChangeDetectorRef,
//   Component,
//   OnInit,
// } from '@angular/core';
// import { FormBuilder } from '@angular/forms';
// import { Agency } from '@models/agency.interface';
// import { ApiService } from '@services/api.service';

// @Component({
//   selector: 'app-agencies',
//   template: `
//     <article *ngIf="agencies$ | async as agencies">
//       <header>Operating with {{ agencies.length }} agencies</header>
//       <table role="grid">
//         <thead>
//           <tr>
//             <th><strong>Agency</strong></th>
//             <th><strong>Range</strong></th>
//             <th><strong>Status</strong></th>
//             <th><strong>Delete</strong></th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr *ngFor="let agency of agencies">
//             <td>{{ agency.name }}</td>
//             <td>{{ agency.range }}</td>
//             <td>{{ agency.status }}</td>
//             <td><button (click)="onDeleteClick(agency.id)">🗑️</button></td>
//           </tr>
//         </tbody>
//       </table>
//     </article>
//     <article>
//       <header>Add a new agency</header>
//       <form [formGroup]="form">
//         <fieldset>
//           <label for="name">Name</label>
//           <input type="text" id="name" name="name" formControlName="name" />
//           <label for="range">Range</label>
//           <span *ngFor="let option of agencyRanges$ | async as options">
//             <input
//               type="radio"
//               name="range"
//               formControlName="range"
//               [id]="option.value"
//               [value]="option.value"
//             />
//             <label [for]="option.value">{{ option.label }}</label>
//           </span>
//           <label for="status">Status</label>
//           <span *ngFor="let option of agencyStatuses$ | async as options">
//             <input
//               type="radio"
//               name="status"
//               formControlName="status"
//               [id]="option.value"
//               [value]="option.value"
//             />
//             <label [for]="option.value">{{ option.label }}</label>
//           </span>
//         </fieldset>
//         <button (click)="onSaveClick()">Submit</button>
//       </form>
//     </article>
//   `,
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class AgenciesComponent implements OnInit {
//   agencies$ = this.api.getAgencies$();
//   agencyRanges$ = this.api.getOptions$('agency-ranges');
//   agencyStatuses$ = this.api.getOptions$('agency-statuses');
//   form = this.formBuilder.group({
//     name: '',
//     range: 'Orbital',
//     status: 'Pending',
//   });
//   constructor(
//     private api: ApiService,
//     private formBuilder: FormBuilder,
//     private cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {}

//   onApiSuccess() {
//     this.agencies$ = this.api.getAgencies$();
//     this.form.reset();
//     this.cdr.detectChanges();
//   }

//   onSaveClick() {
//     const agencyForm = this.form.value as Agency;
//     this.api.postAgency$(agencyForm).subscribe(() => this.onApiSuccess());
//   }

//   onDeleteClick(agencyId: string) {
//     this.api.deleteAgency$(agencyId).subscribe(() => this.onApiSuccess());
//   }
// }
