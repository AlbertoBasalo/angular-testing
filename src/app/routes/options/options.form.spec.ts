import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsForm } from './options.form';

describe('OptionsForm', () => {
  let component: OptionsForm;
  let fixture: ComponentFixture<OptionsForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsForm ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
