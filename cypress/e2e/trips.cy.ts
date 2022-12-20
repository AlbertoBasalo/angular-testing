import { TripsPage } from 'cypress/support/pages/trips.page';

// ! session 6
// ! 3 Page object samples

describe('The Trips page', () => {
  let tripsPage: TripsPage;
  before(() => {
    tripsPage = new TripsPage();
    tripsPage.visit();
  });
  context('whe the page loads', () => {
    it('should show a list of 5 trips', () => {
      tripsPage.getTripsList().should('have.length', 5);
    });
  });
  context('when filling a new trip', () => {
    beforeEach(() => {
      tripsPage.getDestinationInput().type('Asteroide B612');
      tripsPage.getAgencySelect().select('space-y');
      tripsPage.getStartDateInput().type('2030-12-31');
    });
    it('should enable submit button', () => {
      tripsPage.getSubmitButton().should('not.be.disabled');
    });
  });
  context('when filling a new trip without destination', () => {
    beforeEach(() => {
      tripsPage.getDestinationInput().clear();
      tripsPage.getAgencySelect().select('space-y');
      tripsPage.getStartDateInput().type('2030-12-31');
    });
    it('should disable submit button', () => {
      tripsPage.getSubmitButton().should('be.disabled');
    });
  });
});
