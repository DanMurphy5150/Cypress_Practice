///<reference types="Cypress" />

describe('Advanced Automation Practice', function () {
  it('Automating Checkboxes', function () {
    cy.visit('https://rahulshettyacademy.com/AutomationPractice/');
    cy.get('#checkBoxOption1')
      .check()
      .should('be.checked')
      .and('have.value', 'option1');
    cy.get('#checkBoxOption1').uncheck().should('not.be.checked');
    // check all the checkboxes
    cy.get('input[type="checkbox"').check(['option2', 'option3', 'option1']);
  });

  it('Automating Static Dropdowns', function () {
    cy.get('select').select('option2').should('have.value', 'option2');
  });

  it('Automating Dynamic Dropdowns', function () {
    cy.get('#autocomplete').type('United');

    cy.get('.ui-menu-item div').each(($el, index, $list) => {
      if ($el.text() === 'United States (USA)') {
        $el.trigger('click');
      }
    });
    cy.get('#autocomplete').should('have.value', 'United States (USA)');
  });

  it('Automating finding invisbile elements', function () {
    cy.get('#displayed-text').should('be.visible');
    cy.get('#hide-textbox').click();
    cy.get('#displayed-text').should('not.be.visible');
    cy.get('#show-textbox').click();
    cy.get('#displayed-text').should('be.visible');
  });

  it('Automating Radial Buttons', function () {
    cy.get('[value="radio2"').check().should('be.checked');
  });
});
