Feature: Key Pair

  Scenario: User generate key pair first time
    Given I'm login to the app and never generate keys before
    When I send generate key pair request
    Then I should receive key pair

  Scenario: User generate key pair for the next time
    Given I'm login to the app and already generate keys before
    When I send generate key pair request
    Then I should receive exception with inform me about already existing crypto identity in the app
