import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <h6>{{ title }}</h6>
      <p>{{ subtitle }}</p>
      <a [href]="authorUrl">{{ author }}</a>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() title = '';
  subtitle = 'angulab';
  author = 'Alberto Basalo';
  authorUrl = 'https://twitter.com/albertobasalo';
}
