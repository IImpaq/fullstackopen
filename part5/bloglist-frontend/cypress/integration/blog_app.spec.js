describe("Blog app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });
  it("Login form is shown", function() {
    cy.contains("login").as("loginButton");
    cy.get("@loginButton")
      .parent()
      .contains("username")
      .find("input");
    cy.get("@loginButton")
      .parent()
      .contains("password")
      .find("input");
  });
});