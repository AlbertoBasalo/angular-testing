import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Option } from '@models/option.interface';
import { Observable, of } from 'rxjs';
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
    <app-options-list
      *ngIf="options$ | async as options"
      [options]="options"
      (delete)="onDelete($event)"
    >
    </app-options-list>
    <app-options-form (save)="onSave($event)"> </app-options-form>
  `,
  providers: [OptionsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent {
  options$: Observable<Option[]> = of([]);
  endpoint = '';

  constructor(
    private service: OptionsService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {
    this.route.queryParamMap.subscribe((paramMap) => {
      this.endpoint = paramMap.get('endpoint') || '';
      this.options$ = this.service.getOptionsForEndPoint$(this.endpoint);
    });
  }

  onSave(option: Partial<Option>) {
    this.service
      .saveOption$(this.endpoint, option)
      .subscribe(() => this.loadOptions());
  }
  private loadOptions() {
    this.options$ = this.service.getOptionsForEndPoint$(this.endpoint);
    this.cdr.markForCheck();
  }

  onDelete(option: Partial<Option>) {
    this.service
      .deleteOption$(this.endpoint, option)
      .subscribe(() => this.loadOptions());
  }
}
