describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('anguLab');
  });

  it('has a nav bar', () => {
    cy.visit('/');
    cy.get('nav').should('be.visible');
  });

  it('has a footer', () => {
    cy.visit('/');
    cy.get('footer').should('be.visible');
  });

  it('shows a list of items', () => {
    cy.visit('/');
    cy.get('ul').should('be.visible');
  });

  it('can click on a nav menu item', () => {
    cy.visit('/');
    cy.get('ul').should('be.visible');
    cy.get('ul li').first().click();
  });

  it('can click on a booking item anchor', () => {
    cy.visit('/');
    cy.get(':nth-child(1) > :nth-child(4) > a').click();
  });
});
