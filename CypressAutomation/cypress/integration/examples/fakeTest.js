/// <reference types="Cypress" />

describe('My First Test Suite', function () {
  it('My first HTTP case', function () {
    cy.visit('https://rahulshettyacademy.com/angularAppdemo/');
    cy.intercept(
      {
        method: 'GET',
        url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
      },
      {
        stausCode: 200,
        body: [
          {
            book_name: 'RestAssured with java',
            isbn: 'RSU',
            aisle: '2301',
          },
        ],
      }
    ).as('bookretrievals');
    cy.get("button[class='btn btn-primary']").click();
  });
});
