import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsList } from './trips.list';

describe('TripsList', () => {
  let component: TripsList;
  let fixture: ComponentFixture<TripsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripsList ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
