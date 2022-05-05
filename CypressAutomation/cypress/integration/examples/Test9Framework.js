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
