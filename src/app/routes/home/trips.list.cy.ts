import { TimeSpanModule } from 'src/app/pipes/time-span/time-span.module';
import { TripsList } from './trips.list';

/*
 * 4 Component samples
 */

describe('The trips Component', () => {
  beforeEach(() => {
    cy.fixture('trips').then((trips) => {
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
