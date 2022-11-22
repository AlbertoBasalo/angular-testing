import { HomeComponent } from '../src/app/routes/home/home.component';
describe('HomeComponent.cy.ts', () => {
  it('playground', () => {
    cy.mount(HomeComponent);
  });
});
