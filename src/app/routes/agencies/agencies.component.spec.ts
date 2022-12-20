import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Agency } from '@models/agency.interface';
import { ApiService } from '@services/api.service';
import { of } from 'rxjs';

import { AgenciesComponent } from './agencies.component';

// ! session 4
// ! component controller test
// ! integrated with the ApiService

describe('The Agencies Component controller _semi-integrated_', () => {
  let component: AgenciesComponent;
  let fixture: ComponentFixture<AgenciesComponent>;
  let apiService: ApiService; // * the real ApiService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgenciesComponent], // * declare itself
      // * Real FormsModule just for compiling the component
      // * and HttpClientTestingModule fake to not really call the api
      imports: [
        FormsModule, // * Real FormsModule just for compiling the component
        HttpClientTestingModule,
      ],
      schemas: [
        NO_ERRORS_SCHEMA, // * Or avoid FormsModule but ignore template errors
      ],
    }).compileComponents(); // * compile the template
    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(AgenciesComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges(); // * also calls ngOnInit (moved after spies)
  });

  it('should create', () => {
    // * constructor cant be spied
    // expect(component.loadAgencies).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  it('should call loadAgencies on ngOnInit', () => {
    spyOn(component, 'loadAgencies');
    fixture.detectChanges();
    expect(component.loadAgencies).toHaveBeenCalled();
  });

  it('should call getAgencies$ on ngOnInit', () => {
    // * can make apiService a stub with predefined output
    const output = of([]);
    spyOn(apiService, 'getAgencies$').and.returnValue(output);
    fixture.detectChanges();
    expect(apiService.getAgencies$).toHaveBeenCalled();
  });

  it('should call loadAgencies and getAgencies$ on ngOnInit', () => {
    spyOn(component, 'loadAgencies').and.callThrough(); // * allows to spy inner calls
    const output = of([]);
    spyOn(apiService, 'getAgencies$').and.returnValue(output);
    fixture.detectChanges();
    expect(component.loadAgencies).toHaveBeenCalled();
    expect(apiService.getAgencies$).toHaveBeenCalled();
  });
});

// ! session 4
// ! component view test
// ! isolated from the ApiService

fdescribe('The Agencies Component view _isolated_', () => {
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
    // * stub the ApiService with predefined output
    apiServiceStub = {
      getAgencies$: () => of(inputAgencies),
      getOptions$: (r: string) => of([]),
      postAgency$: (a: Agency) => of(a),
      deleteAgency$: (a: string) => of({}),
    };
    await TestBed.configureTestingModule({
      declarations: [AgenciesComponent],
      imports: [FormsModule, HttpClientTestingModule],
      schemas: [
        NO_ERRORS_SCHEMA, // * to ignore template errors while not importing FormsModule
      ],
      providers: [{ provide: ApiService, useValue: apiServiceStub }],
    }).compileComponents();
    fixture = TestBed.createComponent(AgenciesComponent);
    component = fixture.componentInstance;
    component.agencies = inputAgencies;
    fixture.detectChanges();
  });
  it('should present a table with agencies', () => {
    const native = fixture.nativeElement;
    const agenciesTable = native.querySelector('table');
    expect(agenciesTable).toBeTruthy();
    let agenciesBodyRows = native.querySelectorAll('tbody>tr');
    expect(agenciesBodyRows.length).toBe(inputAgencies.length);
  });
  it('should call onDeleteClick on delete button click', () => {
    spyOn(component, 'onDeleteClick'); // * spy the method
    const native = fixture.nativeElement;
    const deleteButtons = native.querySelectorAll('tbody>tr>td>button');
    const firstButton = deleteButtons[0];
    firstButton.click();
    expect(component.onDeleteClick).toHaveBeenCalledWith(inputAgencies[0].id);
  });

  it('should call onSaveClick on save button click', () => {
    spyOn(component, 'onSaveClick').and.callThrough(); // * spy the method
    const native = fixture.nativeElement;
    const saveButtons = native.querySelectorAll('form>button');
    const firstButton = saveButtons[0];
    firstButton.click();
    expect(component.onSaveClick).toHaveBeenCalledTimes(1);
  });
  it('should update agency name', () => {
    const native = fixture.nativeElement;
    const expectedName = 'SpaceX';
    fixture.detectChanges(); // * to update the template
    const nameInput = native.querySelector('input[name="name"]');
    nameInput.value = expectedName;
    nameInput.dispatchEvent(new Event('input'));
    fixture.detectChanges(); // * to update the template
    expect(component.agency.name).toBe(expectedName);
  });

  it('should fill the option radios', () => {
    const debugEl = fixture.debugElement;
    component.agencyRanges = [
      { label: 'Interplanetary', value: 'Interplanetary' },
      { label: 'Orbital', value: 'Orbital' },
    ];
    component.agencyStatuses = [
      { label: 'Active', value: 'Active' },
      { label: 'Inactive', value: 'Inactive' },
    ];
    fixture.detectChanges(); // * to update the template
    const rangeRadios = debugEl.queryAll(By.css('input[name="range"]'));
    const statusRadios = debugEl.queryAll(By.css('input[name="status"]'));
    expect(rangeRadios.length).toBe(component.agencyRanges.length);
    expect(statusRadios.length).toBe(component.agencyStatuses.length);
  });
});
