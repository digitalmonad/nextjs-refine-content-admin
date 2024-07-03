describe("Navigation", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  });
  describe("Responsive design", () => {
    describe("Mobile view", () => {
      before(() => {
        cy.viewport("iphone-6+");
      });
      it("should not render sidebar navigation", () => {
        cy.visit("/");
        cy.get("body").debug();
        cy.get('[data-test="sidebar-navigation"]').should("not.be.visible");
      });

      it("should render topbar navigation", () => {
        cy.visit("/");
        cy.get("body").debug();
        cy.get('[data-test="topbar-navigation"]').should("be.visible");
      });
    });
  });
});
