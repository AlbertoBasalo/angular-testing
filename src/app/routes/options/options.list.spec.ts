import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsList } from './options.list';

describe('OptionsList', () => {
  let component: OptionsList;
  let fixture: ComponentFixture<OptionsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsList ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
