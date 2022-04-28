///<reference types="Cypress" />

describe('More Automation Pactice', function () {
  it('automation for table data', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    cy.get('#opentab').then(function (el) {
      const url = el.prop('href');
      cy.log(url);
      cy.visit(url);
      cy.get('.dropdown-toggle').should('be.visible');
    });
  });
});
