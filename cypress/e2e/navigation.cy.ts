describe("Navigation", () => {
  beforeEach(() => {
    cy.loginAsAdmin();
  });

  describe("Switching between pages", () => {
    it("should navigate to categories page and back to dashboard", () => {
      cy.visit("/");
      cy.get('[data-test="sidebar-navigation"]').within(() => {
        cy.get("a")
          .contains(/categories/i)
          .click();
      });
      cy.get('[data-test="breadcrumbs"]')
        .should("be.visible")
        .invoke("text")
        .should("match", /categories/i);

      cy.get('[data-test="sidebar-navigation"]').within(() => {
        cy.get("a").contains(/posts/i).click();
      });

      cy.get('[data-test="breadcrumbs"]')
        .should("be.visible")
        .invoke("text")
        .should("match", /blog posts/i);
    });
  });

  describe("Responsive design", () => {
    describe("Mobile view", () => {
      beforeEach(() => {
        cy.viewport("iphone-6+");
      });
      it("should not render sidebar navigation", () => {
        cy.visit("/");
        cy.get('[data-test="sidebar-navigation"]').should("not.be.visible");
        cy.get('[data-test="breadcrumbs"]')
          .should("be.visible")
          .invoke("text")
          .should("match", /posts/i);
      });

      it("should render topbar navigation with menu toggle button", () => {
        cy.visit("/");
        cy.get('[data-test="topbar-navigation"]').should("be.visible");
        cy.get('[data-test="toggle-menu-button"]').should("be.visible");
        cy.get('[data-test="breadcrumbs"]')
          .should("be.visible")
          .invoke("text")
          .should("match", /posts/i);
      });

      it("should toggle mobile menu", () => {
        cy.visit("/");
        cy.get('[data-test="topbar-navigation"]').should("be.visible");
        cy.get('[data-test="toggle-menu-button"]').should("be.visible").click();
        cy.get('[data-test="mobile-toggle-navigation-menu"]')
          .should("be.visible")
          .within(() => {
            cy.get("a")
              .invoke("text")
              .should("match", /logout/i);
          });
      });
    });
    describe("Desktop view", () => {
      beforeEach(() => {
        cy.viewport("macbook-15");
      });
      it("should render sidebar navigation", () => {
        cy.visit("/");
        cy.get('[data-test="sidebar-navigation"]').should("be.visible");
        cy.get('[data-test="breadcrumbs"]')
          .should("be.visible")
          .invoke("text")
          .should("match", /posts/i);
      });

      it("should render topbar navigation without menu toggle button", () => {
        cy.visit("/");
        cy.get('[data-test="topbar-navigation"]').should("be.visible");
        cy.get('[data-test="toggle-menu-button"]').should("not.be.visible");
        cy.get('[data-test="breadcrumbs"]')
          .should("be.visible")
          .invoke("text")
          .should("match", /posts/i);
      });
    });
  });
});
