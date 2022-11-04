import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputControl } from './input.control';

describe('InputControl', () => {
  let component: InputControl;
  let fixture: ComponentFixture<InputControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputControl ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
