import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';

import { AgenciesComponent } from './agencies.component';

// ToDo: use IoC to inject an ApiService double

fdescribe('The Agencies Component _semi-integrated_', () => {
  let component: AgenciesComponent;
  let fixture: ComponentFixture<AgenciesComponent>;
  let apiService: ApiService; // ! the real ApiService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgenciesComponent],
      // ! Real FormsModule just for compiling the component
      // ! and HttpClientTestingModule fake to not really call the api
      imports: [FormsModule, HttpClientTestingModule],
    }).compileComponents();
    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(AgenciesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges(); // ! not needed because we are not testing the template
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call loadAgencies on ngOnInit', () => {
    // Arrange
    spyOn(component, 'loadAgencies');
    // Act
    component.ngOnInit();
    // Assert
    expect(component.loadAgencies).toHaveBeenCalled();
  });

  it('should call getAgencies$ on loadAgencies', () => {
    // Arrange
    // ! can make apiService a stub with predefined output
    const output = of([]);
    spyOn(apiService, 'getAgencies$').and.returnValue(output);
    // Act
    component.loadAgencies();
    // Assert
    expect(apiService.getAgencies$).toHaveBeenCalled();
  });
});
