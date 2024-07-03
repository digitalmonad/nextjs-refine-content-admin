/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import users from "../fixtures/users.json";

Cypress.Commands.add("login", (email, password) => {
  cy.session("authenticated", () => {
    cy.visit("/login");
    cy.get('[data-test="login-input-email"]').type(email);
    cy.get('[data-test="login-input-password"]').type(password);
    cy.get('[data-test="login-submit"]').click();
    cy.get("[data-sonner-toast]")
      .invoke("text")
      .should("match", /success/i);
    cy.get('[data-test="blog-posts-page"]').should("exist");
  });
});

Cypress.Commands.add("loginAsAdmin", () => {
  cy.login(users.admin.email, users.admin.password);
});
