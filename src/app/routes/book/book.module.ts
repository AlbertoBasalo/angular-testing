import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { BookForm } from './book.form';


@NgModule({
  declarations: [
    BookComponent,
    BookForm
  ],
  imports: [
    CommonModule,
    BookRoutingModule
  ]
})
export class BookModule { }
