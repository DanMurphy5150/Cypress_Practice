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

  it('', function () {});
});
