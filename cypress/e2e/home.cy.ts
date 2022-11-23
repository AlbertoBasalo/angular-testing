/*
 * Assertion samples
 */

describe('The Home Page', () => {
  before(() => {
    cy.log('runs only once before all the tests');
  });
  beforeEach(() => {
    cy.log('runs once before each tests');
    cy.visit('/');
  });

  it('Visits the initial project page', () => {
    cy.contains('anguLab');
  });

  it('has a nav bar', () => {
    cy.get('nav').should('be.visible');
  });

  it('has a footer', () => {
    cy.get('footer').should('be.visible');
  });

  it('shows a list of items', () => {
    cy.get('main ul').should('be.visible');
  });

  it('should have link to a agencies url', () => {
    cy.get('a[href*="agencies"]').should('exist');
  });

  it('should not have a link to a profile url', () => {
    cy.get('a[href*="profile"]', { timeout: 5000 }).should('not.exist');
  });

  it('should not have orphaned links', { defaultCommandTimeout: 5000 }, () => {
    // check several elements
    cy.get('a').should('not.have.attr', 'href', '#undefined');
    cy.get('a').each((a) => expect(a).to.not.have.attr('href', 'undefined'));
  });

  it('can click on a nav menu item', () => {
    cy.get('ul').should('be.visible');
    cy.get('ul li').first().click();
  });

  afterEach(() => {
    cy.log('runs once after each the tests');
  });

  after(() => {
    cy.log('runs only once after all the tests');
    cy.visit('/');
  });

  // it('can click on a booking item anchor', () => {
  //   cy.get(':nth-child(1) > :nth-child(4) > a').click();
  // });
});
