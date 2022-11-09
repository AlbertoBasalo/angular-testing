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
      <li><em>The Label:</em> ➖ <code>The Value</code><span>🗑️</span></li>
      <li>
        <em>Another Label:</em> ➖ <code>Another Value</code><span>🗑️</span>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsList {
  @Input() options: Option[] = [];
  @Output() delete = new EventEmitter<Option>();
}
