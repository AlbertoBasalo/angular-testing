import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-book-form',
  template: ` <form>book works!</form> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookForm {}
