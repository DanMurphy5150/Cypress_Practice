/// <reference types="Cypress" />

describe('Setting up Test Hooks', function () {
  before('New Hook', function () {
    cy.fixture('example').then(function (data) {
      this.globalData = data;
    });
  });

  // after(function() {
  //     // runs once after all tests in the block
  // })

  // beforeEach( function() {
  //     // runs before each test in a block
  // })
  // afterEach( function() {
  //     // runs after each test in a block
  // })

  it('First Test', function () {
    cy.visit('https://rahulshettyacademy.com/angularpractice/');
    cy.get('form.ng-untouched > :nth-child(1)').type(this.globalData.name);
    cy.get('select').select(this.globalData.gender);
    cy.get(':nth-child(4) > .ng-untouched').should(
      'have.value',
      this.globalData.name
    );
    cy.get("input[name='name']:nth-child(2)").should(
      'have.attr',
      'minlength',
      '2'
    );
    cy.get('#inlineRadio3').should('be.disabled');
  });

  it('Navigate to shop', function () {
    cy.get(':nth-child(2) > .nav-link').click();
    cy.selectProduct('Blackberry');
    cy.selectProduct('Nokia Edge');
  });
});
