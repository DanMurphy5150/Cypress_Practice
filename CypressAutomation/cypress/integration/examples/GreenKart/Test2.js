// the line below add the cy intellisense -- need the ///
///<reference types="Cypress" />

describe('Advanced Practice', function () {
  it('Adding item to cart and checking out', function () {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/');
    cy.get('.search-keyword').type('ca');
    cy.wait(2000);

    cy.get('.products').as('productLocator');

    cy.get('@productLocator')
      .find('.product')
      .each(($el, index, $list) => {
        const vegetableText = $el.find('h4.product-name').text();
        if (vegetableText.includes('Cashews')) {
          $el.find('button').trigger('click');
        }
      });
    cy.get('.cart-icon > img').trigger('click');
    cy.get('.cart-preview > .action-block > button').trigger('click');
    cy.get(':nth-child(14)').click();
  });
});
