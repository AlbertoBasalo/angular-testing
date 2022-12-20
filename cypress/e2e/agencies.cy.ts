// ! session 5
// ! 2 Network interception samples

describe('The agencies page', () => {
  before(() => {});
  beforeEach(() => {
    // * common interception arranges
    interceptGet('agencies');
    interceptGet('agency-ranges');
    interceptGet('agency-statuses');
    cy.visit('/agencies');
    // * wait for the 3 GET requests to be intercepted
    cy.wait('@get_agencies');
    cy.wait('@get_agency-ranges');
  });
  it('should have a title showing 6 agencies', () => {
    cy.get('header').should('contain', '6 agencies');
  });
  it('should call delete when click on remove button', () => {
    interceptDelete('Agencies');
    cy.get(':nth-child(5) > :nth-child(4) > button').click();
    cy.get('@deleteAgencies').its('response.statusCode').should('eq', 204);
  });
  it('should post when fill the form and click on submit button', () => {
    interceptPost('Agencies');
    cy.get('input[name="name"]').type('Agency 7');
    cy.get('#Interplanetary').click();
    cy.get('#Active').click();
    cy.get('button').contains('Submit').click();
    cy.get('@post_agencies').its('response.statusCode').should('eq', 201);
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
  const url = Cypress.env('apiUrl') + '/' + endPoint;
  const response = { fixture: 'data/' + endPoint };
  cy.intercept('get', url, response).as('get_' + endPoint);
}

function interceptDelete(endPoint: string) {
  const url = Cypress.env('apiUrl') + '/' + endPoint + '/*';
  const response = { statusCode: 204 };
  cy.intercept('delete', url, response).as('delete_' + endPoint);
}

function interceptPost(endPoint: string) {
  const url = Cypress.env('apiUrl') + '/' + endPoint;
  const response = { statusCode: 201, body: {} };
  cy.intercept('post', url, response).as('post_' + endPoint);
}
