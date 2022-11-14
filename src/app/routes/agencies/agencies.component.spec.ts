import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';

import { AgenciesComponent } from './agencies.component';

// ToDo: use IoC to inject an ApiService double

fdescribe('The Agencies Component semi-integrated', () => {
  let component: AgenciesComponent;
  let fixture: ComponentFixture<AgenciesComponent>;
  let apiService: ApiService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgenciesComponent],
      // ! FormsModule and HttpClientTestingModule just for compiling the component
      imports: [FormsModule, HttpClientTestingModule],
    }).compileComponents();
    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(AgenciesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
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
    spyOn(apiService, 'getAgencies$').and.returnValue(of([]));
    // Act
    component.loadAgencies();
    // Assert
    expect(apiService.getAgencies$).toHaveBeenCalled();
  });
});
