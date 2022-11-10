import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgenciesComponent } from './agencies.component';

// ToDo: use IoC to inject an ApiService double

fdescribe('AgenciesComponent', () => {
  let component: AgenciesComponent;
  let fixture: ComponentFixture<AgenciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgenciesComponent],
      // ! http client dependency double and ReactiveFormsModule
      //imports: [HttpClientTestingModule, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
