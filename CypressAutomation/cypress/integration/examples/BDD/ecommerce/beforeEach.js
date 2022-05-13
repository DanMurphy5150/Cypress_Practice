beforeEach(function () {
  cy.fixture('example').then(function (data) {
    this.globalData = data;
    console.log(this.globalData);
  });
});
