import { TimeSpanModule } from 'src/app/pipes/time-span/time-span.module';
import { TripsList } from './trips.list';

// ! session 6
// ! 4 Component samples

describe('The trips Component', () => {
  beforeEach(() => {
    // * wait for initial data to be loaded from fixture files
    cy.fixture('trips').then((trips) => {
      // * similar to to TestBed.configureTestingModule({imports: [TimeSpanModule]})
      cy.mount(TripsList, {
        imports: [TimeSpanModule],
        componentProperties: {
          trips: trips,
        },
      });
    });
  });
  it('should display the trip destination', () => {
    cy.get('li').should('contain', 'The Moon');
  });
  it('should display the trip start date with emphasis', () => {
    cy.get('em').should('contain', '01/01/2023');
  });
});
