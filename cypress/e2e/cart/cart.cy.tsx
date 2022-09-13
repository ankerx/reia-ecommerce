/// <reference types="cypress"/>

context("Shopping Cart", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should open the shopping cart", () => {
    cy.get("h1").contains("Something clever, relaxing and catchy");
    const cartBtn = cy.get("#cartBtn");
    cartBtn.click();
    cy.get(".h-full > .border-t > .flex > :nth-child(1)").contains("Subtotal");
  });

  it("should add and remove product from cart", () => {
    cy.visit("http://localhost:3000/product/prod_r2LM5QzEvRlZV1");
    cy.get("#add-btn").click();

    cy.get(".h-full > .border-t > .flex > :nth-child(1)").contains("Subtotal");
    cy.get(".border-t > .flex > :nth-child(2)").contains("zł55.00");

    const removeBtn = cy.get(".flex-1 > .flex > .middle");
    removeBtn.click();
    cy.get(".h-full > .border-t > .flex > :nth-child(1)").contains("Subtotal");
    cy.get(".border-t > .flex > :nth-child(2)").contains("zł0.00");
  });
});

export {};
