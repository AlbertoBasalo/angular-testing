import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsControl } from './options.control';

describe('OptionsControl', () => {
  let component: OptionsControl;
  let fixture: ComponentFixture<OptionsControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsControl ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
