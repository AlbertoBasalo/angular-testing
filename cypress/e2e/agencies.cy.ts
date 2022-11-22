describe('The agencies page', () => {
  beforeEach(() => {
    cy.visit('/agencies');
  });
  it('should have a title', () => {
    cy.get('header').should('contain', 'agencies');
  });
});
