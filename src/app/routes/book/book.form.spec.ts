import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { BookForm } from './book.form';

describe('BookForm', () => {
  let component: BookForm;
  let fixture: ComponentFixture<BookForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookForm],
      imports: [ReactiveFormsModule], // ! ReactiveFormsModule
    }).compileComponents();

    fixture = TestBed.createComponent(BookForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
