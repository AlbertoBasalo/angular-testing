export function interceptGet(endPoint: string) {
  const lowerEndPoint = endPoint.toLowerCase();
  const url = Cypress.env('apiUrl') + '/' + lowerEndPoint;
  const response = { fixture: lowerEndPoint };
  cy.intercept('GET', url, response).as('get' + endPoint);
}
