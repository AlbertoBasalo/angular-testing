import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { ApiModule } from '@components/api/api.module';
import { InputModule } from '@components/input/input.module';
import { OptionsModule } from '@components/options/options.module';
import { ApiStore } from '@services/api.store';
import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { BookForm } from './book.form';
import { BookService } from './book.service';
import { CustomerForm } from './customer.form';

@NgModule({
  declarations: [BookComponent, BookForm, CustomerForm],
  imports: [
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule,
    ApiModule,
    InputModule,
    OptionsModule,
  ],
  providers: [BookService, ApiStore],
})
export class BookModule {}
