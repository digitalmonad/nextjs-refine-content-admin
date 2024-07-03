declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to log in.
     * @example cy.login('user@example.com', 'password')
     */
    login(email: string, password: string): Chainable<void>;
    loginAsAdmin(): Chainable<void>;
  }
}
