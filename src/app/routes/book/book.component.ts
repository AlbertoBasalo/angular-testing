import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  template: `
    <p>
      book works!
    </p>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
