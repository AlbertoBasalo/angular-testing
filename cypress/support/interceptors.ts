export function interceptGet(endPoint: string) {
  const url = Cypress.env('apiUrl') + '/' + endPoint;
  const response = { fixture: 'data/' + endPoint };
  cy.intercept('GET', url, response).as('get_' + endPoint);
}
