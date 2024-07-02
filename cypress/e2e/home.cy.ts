describe("template spec", () => {
  it("passes", () => {
    cy.visit("/");
    cy.get('[data-test="login-input-email"]').type("test@email.com");
  });
});
