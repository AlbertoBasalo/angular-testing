import { HttpClientTestingModule } from '@angular/common/http/testing';
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgenciesComponent], // * declare itself
      // * Real FormsModule just for compiling the component
      // * and HttpClientTestingModule fake to not really call the api
      imports: [FormsModule, HttpClientTestingModule],
    }).compileComponents(); // * compile the template
    apiService = TestBed.inject(ApiService);
    fixture = TestBed.createComponent(AgenciesComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges(); // * not needed because we are not testing the template
  });

  it('should create', () => {
    // * constructor cant be spied
    // expect(component.loadAgencies).toHaveBeenCalled();
    // * check effects
    expect(component).toBeTruthy();
  });

  it('should call loadAgencies on ngOnInit', () => {
    spyOn(component, 'loadAgencies');
    component.ngOnInit(); // * must call ngOnInit manually
    expect(component.loadAgencies).toHaveBeenCalled();
  });

  it('should call getAgencies$ on loadAgencies', () => {
    // * can make apiService a stub with predefined output
    const output = of([]);
    spyOn(apiService, 'getAgencies$').and.returnValue(output);
    component.loadAgencies();
    expect(apiService.getAgencies$).toHaveBeenCalled();
  });
});

// ! session 4
// ! component view test
// ! isolated from the ApiService

describe('The Agencies Component view _isolated_', () => {
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
      providers: [{ provide: ApiService, useValue: apiServiceStub }],
    }).compileComponents();
    fixture = TestBed.createComponent(AgenciesComponent);
    component = fixture.componentInstance;
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

  // it('should update the range value', () => {
  //   const debugEl = fixture.debugElement;
  //   component.agencyRanges = [
  //     { label: 'Interplanetary', value: 'Interplanetary' },
  //     { label: 'Orbital', value: 'Orbital' },
  //   ];
  //   fixture.detectChanges(); // * to update the template
  //   const rangeRadios = debugEl.queryAll(By.css('input[name="range"]'));
  //   rangeRadios[0].nativeElement.dispatchEvent(new Event('change'));
  //   rangeRadios[0].triggerEventHandler('change', { target: rangeRadios[0] });
  //   fixture.detectChanges(); // * to update the template
  //   expect(component.agency.range).toBe(component.agencyRanges[0].value);
  // });
});
