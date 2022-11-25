/*
 * 2 Network interception samples
 */

describe('The agencies page', () => {
  before(() => {});
  beforeEach(() => {
    interceptGet('Agencies');
    interceptGet('Agency-Ranges');
    interceptGet('Agency-Statuses');
    cy.visit('/agencies');
    cy.wait('@getAgencies');
    cy.wait('@getAgency-Ranges');
    cy.wait('@getAgency-Statuses');
  });
  it('should have a title showing 6 agencies', () => {
    cy.get('header').should('contain', '6 agencies');
  });
  it('should call delete when click on remove button', () => {
    interceptDelete('Agencies');
    cy.get(':nth-child(5) > :nth-child(4) > button').click();
    cy.get('@deleteAgencies').its('response.statusCode').should('eq', 204);
  });
  // should post when fill the form and click on submit button
  it('should post when fill the form and click on submit button', () => {
    interceptPost('Agencies');
    cy.get('input[name="name"]').type('Agency 7');
    cy.get('#Interplanetary').click();
    cy.get('#Active').click();
    cy.get('button').contains('Submit').click();
    cy.get('@postAgencies').its('response.statusCode').should('eq', 201);
    const payload = {
      id: 'agency-7',
      name: 'Agency 7',
      range: 'Interplanetary',
      status: 'Active',
    };
    cy.get('@postAgencies').its('request.body').should('deep.equal', payload);
  });
});

function interceptGet(endPoint: string) {
  const lowerEndPoint = endPoint.toLowerCase();
  const url = Cypress.env('apiUrl') + '/' + lowerEndPoint;
  const response = { fixture: lowerEndPoint };
  cy.intercept('GET', url, response).as('get' + endPoint);
}
function interceptDelete(endPoint: string) {
  const lowerEndPoint = endPoint.toLowerCase();
  const url = Cypress.env('apiUrl') + '/' + lowerEndPoint + '/*';
  const response = { statusCode: 204, body: {} };
  cy.intercept('DELETE', url, response).as('delete' + endPoint);
}
function interceptPost(endPoint: string) {
  const lowerEndPoint = endPoint.toLowerCase();
  const url = Cypress.env('apiUrl') + '/' + lowerEndPoint;
  const response = { statusCode: 201, body: {} };
  cy.intercept('POST', url, response).as('post' + endPoint);
}
