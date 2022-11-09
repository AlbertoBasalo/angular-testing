import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OptionsService } from './options.service';

@Component({
  selector: 'app-options',
  template: `
    <app-options-nav></app-options-nav>
    <app-options-list></app-options-list>
    <app-options-form></app-options-form>
  `,
  providers: [OptionsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsComponent implements OnInit {
  constructor(private service: OptionsService) {}

  ngOnInit(): void {}
}
