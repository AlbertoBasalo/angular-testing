import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripsComponent } from './trips.component';
import { TripsService } from './trips.service';

describe('TripsComponent', () => {
  let component: TripsComponent;
  let fixture: ComponentFixture<TripsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TripsComponent],
      imports: [HttpClientTestingModule], // ! http client dependency double
      providers: [TripsService], // ! because it is not provided in the module
    }).compileComponents();

    fixture = TestBed.createComponent(TripsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
