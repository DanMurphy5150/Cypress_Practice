///<reference types="Cypress" />

describe('Advanced Automation Practice', function () {
  it('Automating Checkboxes', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    cy.get('#checkBoxOption1')
      .check()
      .should('be.checked')
      .and('have.value', 'option1');
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked');
    // check all the checkboxes
    cy.get('input[type="checkbox"').check(['option2', 'option3', 'option1']);
  });

  it('Automating Dropdowns', function () {
    cy.get('select').select('option2').should('have.value', 'option2');
  });
});
