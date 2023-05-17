/// <reference types="cypress"/>

context("Shopping Cart", () => {
  beforeEach(() => {
    cy.visit("https://reia-ecommerce.vercel.app/");
  });

  it("should open the shopping cart", () => {
    cy.get("h1").contains("Discover the Perfect Massage & Products!");
    const cartBtn = cy.get("#cartBtn");
    cartBtn.click();
    cy.get(".h-full > .border-t > .flex > :nth-child(1)").contains("Subtotal");
  });

  it("should add and remove product from cart", () => {
    cy.visit("https://reia-ecommerce.vercel.app/product/prod_gvRjwOQ3mA54mN");
    cy.get("#add-btn").click().wait(1000);

    cy.get(".h-full > .border-t > .flex > :nth-child(1)").contains("Subtotal");
    cy.get(".border-t > .flex > :nth-child(2)").contains("zł33.99");

    //remove
    const removeBtn = cy.get(".flex-1 > .flex > .middle");
    removeBtn.click();
    cy.get(".h-full > .border-t > .flex > :nth-child(1)").contains("Subtotal");
    cy.get(".border-t > .flex > :nth-child(2)").contains("zł0.00");
  });
});

export {};
