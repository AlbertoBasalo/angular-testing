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
    // ! constructor cant be spied
    // expect(component.loadAgencies).toHaveBeenCalled();
    // * check effects
    expect(component).toBeTruthy();
  });

  it('should call loadAgencies on ngOnInit', () => {
    // Arrange
    spyOn(component, 'loadAgencies');
    // Act
    component.ngOnInit(); // ! must call ngOnInit
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

describe('The Agencies Component _presentation_', () => {
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
      deleteAgency$: (a: string) => of({}),
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
    const native = fixture.nativeElement;
    // Act
    const actualTable = native.querySelector('table');
    // Assert
    expect(actualTable).toBeTruthy();
    let actualBodyRows = native.querySelectorAll('tbody>tr');
    const actualBodyRowsLength = actualBodyRows.length;
    const expectedBodyRowsLength = inputAgencies.length;
    expect(actualBodyRowsLength).toBe(expectedBodyRowsLength);
  });
  it('should call onDeleteClick on delete button click', () => {
    // Arrange
    spyOn(component, 'onDeleteClick');
    const native = fixture.nativeElement;
    // Act
    const actualDeleteButtons = native.querySelectorAll('tbody>tr>td>button');
    const firstButton = actualDeleteButtons[0];
    firstButton.click();
    const expected = inputAgencies[0].id;
    // Assert
    expect(component.onDeleteClick).toHaveBeenCalledWith(expected);
  });

  it('should call onSaveClick on save button click', () => {
    // Arrange
    spyOn(component, 'onSaveClick');
    const native = fixture.nativeElement;
    // Act
    const actualSaveButtons = native.querySelectorAll('form>button');
    const firstButton = actualSaveButtons[0];
    firstButton.click();
    // Assert
    expect(component.onSaveClick).toHaveBeenCalled();
  });

  // ToDo: it should allow to fill the form
  it('should allow to fill the form', () => {
    // Arrange
    const native = fixture.nativeElement;
    const debug = fixture.debugElement;
    const expectedName = 'SpaceX';
    const expectedRange = 'Interplanetary';
    const expectedStatus = 'Active';
    component.agencyRanges = [
      { label: 'Interplanetary', value: 'Interplanetary' },
      { label: 'Orbital', value: 'Orbital' },
    ];
    component.agencyStatuses = [
      { label: 'Active', value: 'Active' },
      { label: 'Inactive', value: 'Inactive' },
    ];
    fixture.detectChanges();
    // Act
    const actualNameInput = native.querySelector('input[name="name"]');
    const actualRangeElement = native.querySelector('#Interplanetary');
    actualNameInput.value = expectedName;
    actualNameInput.dispatchEvent(new Event('input'));
    console.log(actualRangeElement.checked);
    actualRangeElement.checked = true;
    console.log(actualRangeElement.checked);
    actualRangeElement.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    // Assert
    expect(component.agency.name).toBe(expectedName);
    expect(component.agency.range).toBe(expectedRange);
  });
});

// it should call onSaveClick on save button click
