beforeEach(function () {
  cy.fixture('example').then(function (data) {
    this.globalData = data;
    console.log(this.globalData);
  });
});

// "testFiles": "**/*.feature"
// add file above to cypress.json to run the integrated tests
