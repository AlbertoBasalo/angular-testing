import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Agency } from '@models/agency.interface';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';

import { AgenciesComponent } from './agencies.component';

describe('The Agencies Component _semi-integrated_', () => {
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

fdescribe('The Agencies Component _presentation_', () => {
  let component: AgenciesComponent;
  let fixture: ComponentFixture<AgenciesComponent>;
  let apiServiceStub: any;
  const inputAgencies: Agency[] = [
    {
      id: 'space-x',
      name: 'SpaceX',
      range: 'Interplanetary',
      status: 'Active',
    },
    {
      id: 'blue-origin',
      name: 'Blue Origin',
      range: 'Orbital',
      status: 'Active',
    },
  ];
  beforeEach(async () => {
    apiServiceStub = {
      getAgencies$: () => of(inputAgencies),
      getOptions$: (r: string) => of([]),
      postAgency$: (a: Agency) => of(a),
      deleteAgency$: () => of({}),
    };
    await TestBed.configureTestingModule({
      declarations: [AgenciesComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [{ provide: ApiService, useValue: apiServiceStub }],
    }).compileComponents();
    fixture = TestBed.createComponent(AgenciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should present a table with agencies', () => {
    // Arrange
    // Act
    const actualTable = fixture.nativeElement.querySelector('table');
    // Assert
    expect(actualTable).toBeTruthy();
    let actualBodyRows = fixture.nativeElement.querySelectorAll('tbody>tr');
    const actualBodyRowsLength = actualBodyRows.length;
    const expectedBodyRowsLength = inputAgencies.length;
    expect(actualBodyRowsLength).toBe(expectedBodyRowsLength);
  });
});

// it should call onDeleteClick on delete button click

// it should allow to fill the form

// it should call onSaveClick on save button click
