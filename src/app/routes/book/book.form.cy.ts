import { ReactiveFormsModule } from '@angular/forms';
import { InputModule } from '@components/input/input.module';
import { createOutputSpy } from 'cypress/angular';
import { OptionsModule } from '../options/options.module';
import { BookForm } from './book.form';
import { CustomerForm } from './customer.form';

/*
 * 5 Form samples
 */

describe('The book form', () => {
  beforeEach(() => {
    cy.viewport(500, 700);
    cy.mount(BookForm, {
      declarations: [CustomerForm],
      imports: [ReactiveFormsModule, InputModule, OptionsModule],
      componentProperties: {
        tripId: '1',
        places: 1,
        book: createOutputSpy('bookSpy'),
      },
    });
  });
  it('should display a form', () => {
    cy.get('form').should('exist');
  });
  // should fill the form
  it('should fill the form', () => {
    cy.get('#name').type('E. Musk');
    cy.get('input[name="email"]').type('e@m.org');
    cy.get('#seats').clear().type('1');
    cy.get('button').click();
    cy.get('@bookSpy').should('have.been.called');
    cy.get('@bookSpy').should('have.been.calledWith', {
      id: '',
      tripId: '1',
      customer: {
        name: 'E. Musk',
        email: 'e@m.org',
        phone: '',
        gender: '',
      },
      seats: '1',
      premiumFood: '',
      paymentMethod: 'credit-card',
      status: 'Pending',
      date: new Date().toISOString().substring(0, 10),
    });
  });
});
