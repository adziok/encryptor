Feature: Authorization

Scenario: Account sign in to the app
  Given I provide valid credentials with email: "test@test.com"
  When I send sign in request
  Then I should receive token

Scenario: Second account sign in to the app
  Given I provide valid credentials with email: "test2@test.com"
  When I send sign in request
  Then I should receive token