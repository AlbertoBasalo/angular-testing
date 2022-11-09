import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsNav } from './options.nav';

describe('OptionsNav', () => {
  let component: OptionsNav;
  let fixture: ComponentFixture<OptionsNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsNav ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
