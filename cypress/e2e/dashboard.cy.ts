describe("Dashboard", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  });
  it("should render dashboard page", () => {
    cy.visit("/");
    cy.get('[data-test="blog-posts-page"]').should("exist");
    // Add assertions to verify successful login
  });
});
