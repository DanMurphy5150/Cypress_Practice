import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
import HomePage from '../../../../support/pageObjects/HomePage.js';
import ProductPage from '../../../../support/pageObjects/ProductPage.js';

const homePage = new HomePage();
const productsPage = new ProductPage();
let name;

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

When('I fill the form details', function (dataTable) {
  homePage.getEditBox().type(dataTable.rawTable[1][0]);
  homePage.getGender().select(dataTable.rawTable[1][1]);
});

Then('Validate the form behavior', function (dataTable) {
  name = dataTable.rawTable[1][0];
  homePage.getTwoWayDataBinding().should('have.value', name);
  homePage.getEditBox().should('have.attr', 'minlength', '2');
  homePage.getEnterepreneaur().should('be.disabled');
});
And('Select the Shop Page', function () {
  homePage.getShopTab().click();
});
