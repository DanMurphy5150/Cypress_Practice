import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import HomePage from '../../../../support/pageObjects/HomePage.js';
import ProductPage from '../../../../support/pageObjects/ProductPage.js';

const homePage = new HomePage();
const productsPage = new ProductPage();

Given('I open Ecommerce Page', function () {
  cy.visit(Cypress.env('url'));
});

When('I add items to the Cart', function () {
  homePage.getShopTab().click();
  this.globalData.products.forEach(function (element) {
    cy.selectProduct(element);
  });
  productsPage.checkoutButton().click();
});

And('Validate the total price', function () {
  let productSum = 0;
  cy.get('tr td:nth-child(4) strong')
    .each((el, index, list) => {
      cy.log(el.text());
      const priceText = el.text();
      let integerText = priceText.split(' ');
      integerText = integerText[1].trim();
      productSum = Number(productSum) + Number(integerText);
      cy.log('IntegerText: ' + integerText);
      cy.log('ProductSum: ' + productSum);
    })
    .then(function () {
      cy.log('finalSum: ' + productSum);
    });
  cy.get('h3 strong').then(function (el) {
    const checkoutAmount = el.text();
    let formatedCheckoutAmount = checkoutAmount.split(' ');
    formatedCheckoutAmount = formatedCheckoutAmount[1].trim();
    expect(Number(formatedCheckoutAmount)).to.equal(productSum);
  });
  cy.contains('Checkout').click();
});

Then('select the country submit and verify Thankyou', function () {
  cy.get('#country').type('United States of America');
  cy.get('.suggestions > ul > li > a').click();
  cy.get('#checkbox2').click({ force: true });
  cy.get('input[type="submit"]').click();
  // cy.get('.alert').should(
  //   'have.text',
  //   'Success! Thank you! Your order will be delivered in next few weeks :-).'
  // );
  cy.get('.alert').then(function (element) {
    const alertText = element.text();
    expect(
      alertText.includes(
        'Success! Thank you! Your order will be delivered in next few weeks :-).'
      )
    ).to.be.true;
  });
});
