import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { OptionsList } from './options.list';

describe('The Options List component', () => {
  let component: OptionsList;
  let fixture: ComponentFixture<OptionsList>;

  beforeEach(async () => {
    // ! hack; changeDetection to default
    await TestBed.configureTestingModule({
      declarations: [OptionsList],
    })
      .overrideComponent(OptionsList, {
        set: { changeDetection: ChangeDetectionStrategy.Default },
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
    // arrange
    const input = [
      { label: 'test', value: 'test' },
      { label: 'test2', value: 'test2' },
    ];
    component.options = input;
    fixture.detectChanges();
    // act
    const actualListItems = fixture.nativeElement.querySelectorAll('li');
    // assert
    const actual = actualListItems.length;
    const expected = input.length;
    expect(actual).toBe(expected);
  });

  // should emit delete event when delete button is clicked
  it('should emit delete event when delete button is clicked', () => {
    // arrange
    const input = [
      { label: 'test', value: 'test' },
      { label: 'test2', value: 'test2' },
    ];
    component.options = input;
    fixture.detectChanges();
    const deleteButtons = fixture.debugElement.queryAll(
      By.css('span[name="delete"]')
    );
    // act
    const actual = spyOn(component.delete, 'emit');
    deleteButtons[0].triggerEventHandler('click', null);
    // assert
    const expected = input[0];
    expect(actual).toHaveBeenCalledWith(expected);
  });
});

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
  toBeDeleted: any = null;
  onDelete(event: any) {
    this.toBeDeleted = event;
  }
}

describe('The Options List hosted component', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  // ! testing form the host perspective
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, OptionsList],
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should sent a list of options to presenter', () => {
    // arrange
    fixture.detectChanges();
    // act
    const actualListItems = fixture.nativeElement.querySelectorAll('li');
    // assert
    const actual = actualListItems.length;
    const expected = 2;
    expect(actual).toBe(expected);
  });

  it('should subscribe to delete event', () => {
    // arrange
    fixture.detectChanges();
    const deleteButtons = fixture.debugElement.queryAll(
      By.css('span[name="delete"]')
    );
    // act
    deleteButtons[0].triggerEventHandler('click', null);
    fixture.detectChanges();
    // assert
    const actual = component.toBeDeleted; // ! using an effect instead of spy
    const expected = component.input[0];
    expect(actual).toEqual(expected);
  });
});
