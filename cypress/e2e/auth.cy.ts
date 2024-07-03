describe("Login", () => {
  it("should login with valid credentials and display success message", () => {
    cy.loginAsAdmin();

    // Add assertions to verify successful login
  });

  it("should not login with invalid credentials display and error message", () => {
    cy.visit("/");
    cy.get('[data-test="login-input-email"]').type("invalid@mail.com");
    cy.get('[data-test="login-input-password"]').type("invalidpassword");
    cy.get('[data-test="login-submit"]').click();
    cy.get("[data-sonner-toast]")
      .invoke("text")
      .should("match", /invalid/i);
  });
});
