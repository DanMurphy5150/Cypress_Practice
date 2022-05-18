Feature: End to end Ecommerce Validiation

    application Regression
    @Regression
    Scenario: Ecommerce products delivery
    Given I open Ecommerce Page
    When I add items to the Cart
    And Validate the total price
    Then select the country submit and verify Thankyou

    @Smoke
    Scenario: Filling out the Form
    Given I open Ecommerce Page
    When I fill the form details
        |name  | Gender |
        |Sammy | Female |
    Then Validate the form behavior
        |name  | Gender |
        |Sammy | Female |
    And Select the Shop Page