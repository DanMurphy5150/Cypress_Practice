/// <reference types="Cypress" />

describe('My First Test Suite', function () {
  it('My FirstTest case', function () {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('.search-keyword').type('ca');
    cy.wait(2000);
    cy.get('.product:visible').should('have.length', 4);
  });

  it('My Second Test Case', function () {
    // test step
  });
});
