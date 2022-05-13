// the line below add the cy intellisense -- need the ///
///<reference types="Cypress" />
// Command to open cypress
// ./node_modules/.bin/cypress open
//Run a specific test file
//./node_modules/.bin/cypress run --spec 'cypress/integration/examples/Test2.js'
// run in specific browser
//  ./node_modules/.bin/cypress run --browser chrome
describe('My First Test Suite', function () {
  it('My FirstTest case', function () {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('.search-keyword').type('ca');
    cy.wait(2000);
    cy.get('.product:visible').should('have.length', 4);
    // parent child chaining
    cy.get('.products').as('productLocator');
    cy.get('@productLocator').find('.product').should('have.length', 4);
    // targets item by index with eg()
    cy.get('@productLocator')
      .find('.product')
      .eq(2)
      .contains('ADD TO CART')
      .click();
    // find product by name
    cy.get('@productLocator')
      .find('.product')
      .each(($el, index, $list) => {
        const vegetableText = $el.find('h4.product-name').text();
        if (vegetableText.includes('Cashews')) {
          $el.find('button').trigger('click');
        }
      });
  });

  it('Logo is displayed correctly', function () {
    // assert if logo is correctly displayed
    cy.get('.brand').should('have.text', 'GREENKART');

    // this is to print in the logs
    cy.get('.brand').then(function (logoElement) {
      cy.log(logoElement.text());
    });
  });
});
