import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciesComponent } from './agencies.component';

describe('AgenciesComponent', () => {
  let component: AgenciesComponent;
  let fixture: ComponentFixture<AgenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgenciesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
