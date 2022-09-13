/// <reference types="cypress"/>

context("Home Page", () => {
  beforeEach(() => {
    cy.visit("https://reia-ecommerce.vercel.app/");
  });

  it("should render the home page and display a hero section", () => {
    cy.get("h1").contains("Something clever, relaxing and catchy");
  });
  it("should show trending products", () => {
    cy.get(".grid").children();
    cy.get(":nth-child(1) > .flex-col > .text-center > .tracking-normal").contains("Sweet candle");
  });
  it("should redirect to different page", () => {
    cy.get('a[href*="products"]').click({ multiple: true, force: true });
    cy.url().should("include", "/products");
    cy.get("h3").contains("All products are made by myself");
  });
});
export {};
