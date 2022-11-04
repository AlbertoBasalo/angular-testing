import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { BookForm } from './book.form';

@NgModule({
  declarations: [BookComponent, BookForm],
  imports: [CommonModule, BookRoutingModule, ReactiveFormsModule],
})
export class BookModule {}
