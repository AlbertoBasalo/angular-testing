import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { TripsForm } from './trips.form';
import { TripsService } from './trips.service';

// ! session 4
// ! ReactiveFormsModule test

class TripsServiceStub {
  loadAgencies() {}
  saveTrip() {}
  selectAgenciesState$() {
    return of({
      data: [{ id: 1, name: 'Agency 1' }],
    });
  }
}

describe('The Trips Form interaction', () => {
  let component: TripsForm;
  let fixture: ComponentFixture<TripsForm>;
  let native: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripsForm],
      imports: [ReactiveFormsModule, HttpClientTestingModule], // * ReactiveFormsModule
      providers: [{ provide: TripsService, useValue: new TripsServiceStub() }],
    })
      .overrideComponent(TripsForm, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
    fixture = TestBed.createComponent(TripsForm);
    component = fixture.componentInstance;
    native = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form', () => {
    expect(component.form).toBeTruthy();
  });

  it('should display a form', () => {
    const form = native.querySelector('form');
    expect(form).toBeTruthy();
  });

  it('should fill in the form', () => {
    const destination = 'New York';
    const agencyId = '1';
    const startDate = '2021-01-01';

    component.form.patchValue({
      destination,
      agencyId,
      startDate,
    });

    expect(component.form.value).toEqual({
      destination,
      agencyId,
      startDate,
    });
  });

  it('should allow filling in the form', () => {
    const destination = 'The Moon';
    const startDate = '2025-01-01';
    const agencyId = '1';

    const inputs = native.querySelectorAll('input');
    const destinationInput = inputs[0];
    const startDateInput = inputs[1];
    const agencyIdSelect = native.querySelector('select');

    destinationInput.value = destination;
    startDateInput.value = startDate;
    agencyIdSelect.options[0].selected = true;

    destinationInput.dispatchEvent(new Event('input'));
    startDateInput.dispatchEvent(new Event('input'));
    agencyIdSelect.dispatchEvent(new Event('change'));

    expect(component.form.value).toEqual({
      destination,
      agencyId,
      startDate,
    });
  });
});
