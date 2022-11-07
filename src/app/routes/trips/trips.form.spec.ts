import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TripsForm } from './trips.form';

describe('TripsForm', () => {
  let component: TripsForm;
  let fixture: ComponentFixture<TripsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripsForm],
      imports: [ReactiveFormsModule], // ! ReactiveFormsModule
    }).compileComponents();

    fixture = TestBed.createComponent(TripsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
