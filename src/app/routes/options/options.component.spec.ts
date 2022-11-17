import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChangeDetectionStrategy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { OptionsComponent } from './options.component';
import { OptionsList } from './options.list';
import { OptionsService } from './options.service';

fdescribe('OptionsComponent', () => {
  let component: OptionsComponent;
  let fixture: ComponentFixture<OptionsComponent>;
  let optionsServiceStub: any;
  let activatedRouteStub: any;
  beforeEach(async () => {
    optionsServiceStub = {
      getOptionsForEndPoint$: () => of([{ label: 'test', value: 'test' }]),
      saveOption$: () => of({ label: 'test', value: 'test' }),
      deleteOption$: () => of({ label: 'test', value: 'test' }),
    };
    activatedRouteStub = {
      queryParamMap: of({ get: () => 'testOption' }),
    };
    await TestBed.configureTestingModule({
      declarations: [OptionsComponent, OptionsList], // ! the options list will be needed
      imports: [HttpClientTestingModule, RouterTestingModule], // ! testing modules are fakes
      providers: [
        { provide: OptionsService, useValue: optionsServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideComponent(OptionsComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
      })
      .compileComponents();

    fixture = TestBed.createComponent(OptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present a list of options', () => {
    // arrange
    const input = [{ label: 'test', value: 'test' }];
    component.options$ = of(input);
    fixture.detectChanges();
    // act
    const actualListItems = fixture.nativeElement.querySelectorAll('li');
    // assert
    const actual = actualListItems.length;
    const expected = 1;
    expect(actual).toBe(expected);
  });
});
