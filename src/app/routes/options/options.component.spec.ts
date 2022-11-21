import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { OptionsComponent } from './options.component';
import { OptionsList } from './options.list';
import { OptionsService } from './options.service';

describe('The Options Component', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;
  let optionsServiceStub: jasmine.SpyObj<OptionsService>;
  let activatedRouteStub: any;
  beforeEach(async () => {
    // optionsServiceStub = {
    //   getOptionsForEndPoint$: () => of([{ label: 'test', value: 'test' }]),
    //   saveOption$: () => of({ label: 'test', value: 'test' }),
    //   deleteOption$: () => of({ label: 'test', value: 'test' }),
    // };
    const optionsServiceSpy = jasmine.createSpyObj('OptionsService', [
      'getOptionsForEndPoint$',
      'saveOption$',
      'deleteOption$',
    ]);

    activatedRouteStub = {
      queryParamMap: of({ get: () => 'testOption' }),
    };
    await TestBed.configureTestingModule({
      declarations: [OptionsComponent, OptionsList], // ! needed to render the component
      // imports: [HttpClientTestingModule, RouterTestingModule], // ! testing modules fakes
      providers: [
        // ! provider stubs
        { provide: OptionsService, useValue: optionsServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(OptionsComponent, {
        // ! hack; changeDetection to default
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();
    optionsServiceStub = TestBed.inject(
      OptionsService
    ) as jasmine.SpyObj<OptionsService>;
    optionsServiceStub.getOptionsForEndPoint$
      .withArgs('endPoint')
      .and.returnValue(of([{ label: 'test', value: 'test' }]));
    optionsServiceStub.saveOption$
      .withArgs('endPoint', { label: 'test', value: 'test' })
      .and.returnValue(of({ label: 'test', value: 'test' }));
    optionsServiceStub.deleteOption$
      .withArgs('endPoint', { label: 'test', value: 'test' })
      .and.returnValue(of({ label: 'test', value: 'test' }));
    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should present a list of options', () => {
  //   // arrange
  //   const input = [{ label: 'test', value: 'test' }];
  //   component.options$ = of(input);
  //   fixture.detectChanges();
  //   // act
  //   const actualListItems = fixture.nativeElement.querySelectorAll('li');
  //   // assert
  //   const actual = actualListItems.length;
  //   const expected = 1;
  //   expect(actual).toBe(expected);
  // });
});
