/// <reference types="Cypress" />
import HomePage from '../pageObjects/HomePage.js';
import ProductPage from '../pageObjects/ProductPage.js';

describe('Setting up Test Hooks', function () {
  beforeEach('New Hook', function () {
    cy.fixture('example').then(function (data) {
      this.globalData = data;
      console.log(this.globalData);
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
    const homePage = new HomePage();
    cy.visit('https://rahulshettyacademy.com/angularpractice/');
    homePage.getEditBox().type(this.globalData.name);
    homePage.getGender().select(this.globalData.gender);
    homePage.getTwoWayDataBinding().should('have.value', this.globalData.name);
    homePage.getEditBox().should('have.attr', 'minlength', '2');
    homePage.getEnterepreneaur().should('be.disabled');
  });

  it('Navigate to shop', function () {
    const homePage = new HomePage();
    const productsPage = new ProductPage();
    homePage.getShopTab().click();
    console.log(this.globalData);
    this.globalData.products.forEach(function (element) {
      cy.selectProduct(element);
      console.log(element);
    });
    productsPage.checkoutButton().click();
    cy.contains('Checkout').click();
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
});
