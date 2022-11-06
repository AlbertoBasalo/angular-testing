import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <em>
        <app-link
          [caption]="title"
          [url]="repoUrl"
          [title]="repoTitle"
        ></app-link>
        made by
        <app-link [caption]="author" [url]="authorUrl"></app-link>
      </em>
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  @Input() title = '';
  repoTitle = 'anguLab repository';
  repoUrl = 'https://github.com/AlbertoBasalo/angulab';
  author = 'Alberto Basalo';
  authorUrl = 'https://albertobasalo.dev';
}
