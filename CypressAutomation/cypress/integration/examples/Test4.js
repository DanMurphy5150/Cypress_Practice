///<reference types="Cypress" />

describe('Learning Cypress Automation', function () {
  it('automating Alerts in Cypress', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    cy.get('#alertbtn').click();
  });
});
