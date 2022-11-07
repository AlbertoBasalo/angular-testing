import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AgenciesComponent } from './agencies.component';

describe('AgenciesComponent', () => {
  let component: AgenciesComponent;
  let fixture: ComponentFixture<AgenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgenciesComponent],
      imports: [HttpClientTestingModule, ReactiveFormsModule], // ! http client dependency double and ReactiveFormsModule
    }).compileComponents();

    fixture = TestBed.createComponent(AgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
