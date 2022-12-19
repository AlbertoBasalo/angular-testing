import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { OptionsList } from './options.list';

// ! session 4
// ! component OnPush

describe('The Options List component', () => {
  let component: OptionsList;
  let fixture: ComponentFixture<OptionsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OptionsList],
    })
      .overrideComponent(OptionsList, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default, // * hack; changeDetection to default
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(OptionsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present a list of options', () => {
    const input = [
      { label: 'test', value: 'test' },
      { label: 'test2', value: 'test2' },
    ];
    component.options = input;
    fixture.detectChanges();
    const listItems = fixture.nativeElement.querySelectorAll('li');
    expect(listItems.length).toBe(input.length);
  });
  // ToDo: student exercise
  it('should emit delete event when delete button is clicked', () => {
    const input = [
      { label: 'test', value: 'test' },
      { label: 'test2', value: 'test2' },
    ];
    component.options = input;
    fixture.detectChanges();
    const deleteButtons = fixture.debugElement.queryAll(
      By.css('span[name="delete"]')
    );
    const actual = spyOn(component.delete, 'emit');
    deleteButtons[0].triggerEventHandler('click', null);
    expect(actual).toHaveBeenCalledWith(input[0]);
  });
});

// ! session 4
// ! component hosted

@Component({
  selector: 'app-host',
  template: `
    <app-options-list
      [options]="input"
      (delete)="onDelete($event)"
    ></app-options-list>
  `,
})
class HostComponent {
  input = [
    { label: 'test', value: 'test' },
    { label: 'test2', value: 'test2' },
  ];
  token: any = null;
  onDelete(optionValue: any) {
    this.token = optionValue;
  }
}

describe('The Options List hosted component', () => {
  // * testing from the host perspective
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let native: any;
  let debug: any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, OptionsList],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    native = fixture.nativeElement;
    debug = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should sent a list of options to presenter', () => {
    const listItems = native.querySelectorAll('li');
    expect(listItems.length).toBe(2);
  });

  it('should perform a deletion after delete click', () => {
    const deleteButtons = debug.queryAll(By.css('span[name="delete"]'));
    deleteButtons[0].triggerEventHandler('click', null);
    // * assert over an effect instead of spy a call
    expect(component.token).toEqual(component.input[0]);
  });
});
