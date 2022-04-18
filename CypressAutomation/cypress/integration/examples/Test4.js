///<reference types="Cypress" />

describe('Learning Cypress Automation', function () {
  it('automating Alerts in Cypress', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    cy.get('#alertbtn').click();
    //window:alert
    cy.on('window:alert', (str) => {
      expect(str).to.equal(
        'Hello , share this practice page and share your knowledge'
      );
    });
  });

  it('Automating window confirm', function () {
    cy.on('window:confirm', (str) => {
      expect(str).to.equal(
        'Hello , share this practice page and share your knowledge'
      );
    });
  });
});
