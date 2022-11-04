import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkingMessageComponent } from './working-message.component';

describe('WorkingMessageComponent', () => {
  let component: WorkingMessageComponent;
  let fixture: ComponentFixture<WorkingMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkingMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkingMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
