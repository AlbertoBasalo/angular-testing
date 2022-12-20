// ! session 5
// ! 1 Assertion samples

describe('The Home Page', () => {
  before(() => {
    cy.visit('/');
    cy.log('runs only once before all the tests');
  });

  beforeEach(() => {
    cy.log('runs once before each tests');
  });

  it('Contains title', () => {
    cy.contains('anguLab');
  });

  it('contains a nav element', () => {
    cy.get('nav');
  });

  it('should have a nav element visible', () => {
    cy.get('nav').should('be.visible');
  });

  it(
    'should display an unordered list inside the main',
    { defaultCommandTimeout: 5000 },
    () => {
      cy.get('main ul').should('be.visible');
    }
  );

  it('should navigate to agencies page', () => {
    cy.get('a[href*="agencies"]').click();
  });

  it('should not have a link to profile', () => {
    cy.wait(2000);
    cy.get('a[href*="profile"]').should('not.exist');
  });

  it('should not have orphaned links', { defaultCommandTimeout: 5000 }, () => {
    cy.get('a').should('not.have.attr', 'href', '#undefined');
    cy.get('a').each((a) => expect(a).to.not.have.attr('href', '#undefined'));
  });

  afterEach(() => {
    cy.log('runs once after each the tests');
  });

  after(() => {
    cy.log('runs only once after all the tests');
    cy.visit('/');
  });
});
