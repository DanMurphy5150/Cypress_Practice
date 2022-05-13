Feature: End to end Ecommerce Validiation

    application Regression

    Scenario: Ecommerce products delivery
    Given I open Ecommerce Page
    When I add items to the Cart
    And Validate the total price
    Then select the country submit and verify Thankyou