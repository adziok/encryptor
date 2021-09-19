Feature: Key Pair

Scenario: User encrypt file after creating key pair
  Given I login to the app and generate key pair
  When I send encode file request
  Then I should receive base64 response and encryption key

Scenario: User encrypt file without generating key pair
  Given I login to the app without generating key pair before
  When I send encode file request
  Then I should receive error response