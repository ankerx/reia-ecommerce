/// <reference types="cypress"/>

context("Home Page", () => {
  beforeEach(() => {
    cy.visit("https://reia-ecommerce.vercel.app/");
  });

  it("should render the home page and display a hero section", () => {
    cy.get("h1").contains("Discover the Perfect Massage & Products!");
  });
  it("should show trending products", () => {
    cy.get(".grid").children();
    cy.get(":nth-child(1) > .flex-col > .text-center > .tracking-normal").contains("Moon candle");
  });
  it("should redirect to different page", () => {
    cy.get('a[href*="products"]').click({ multiple: true, force: true });
    cy.url().should("include", "https://reia-ecommerce.vercel.app/products");
    cy.get(".mx-auto > .relative > .peer").should("be.visible");
  });
  it("should filter products", () => {
    cy.visit("https://reia-ecommerce.vercel.app/products");
    cy.url().should("include", "https://reia-ecommerce.vercel.app/products");
    const serachInput = cy.get(".mx-auto > .relative > .peer");
    serachInput.should("be.visible");
    serachInput.type("oil");
    cy.get(".tracking-normal").contains("Honey Oil");
  });
});
export {};
