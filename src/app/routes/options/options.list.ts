import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Option } from '@models/option.interface';
@Component({
  selector: 'app-options-list',
  template: `
    <ul>
      <li *ngFor="let option of options">
        <span>
          <em>{{ option.label }}</em>
        </span>
        <span>
          <code>{{ option.value }}</code>
        </span>
        <span name="delete" (click)="delete.emit(option)">🗑️</span>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsList {
  @Input() options: Option[] = [];
  @Output() delete = new EventEmitter<Option>();
}
