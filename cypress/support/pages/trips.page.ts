import { interceptGet } from '../interceptors';
export class TripsPage {
  visit() {
    interceptGet('Trips');
    interceptGet('Agencies');
    cy.visit('/trips');
    cy.wait('@getAgencies');
    cy.wait('@getTrips');
  }
  getTripsList() {
    return cy.get('app-trips-list > ul li');
  }
  getDestinationInput() {
    return cy.get('input[formcontrolname="destination"]');
  }
  getAgencySelect() {
    return cy.get('select[formcontrolname="agencyId"]');
  }
  getStartDateInput() {
    return cy.get('input[formcontrolname="startDate"]');
  }
  getSubmitButton() {
    return cy.get('button[type="submit"]');
  }
}
