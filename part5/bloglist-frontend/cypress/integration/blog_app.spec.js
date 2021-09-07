describe("Blog app", function() {
  const user = {
    name: "root_name",
    username: "root_user",
    password: "root_password"
  };

  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users/", user);
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
  describe("Login", function() {
    it("fails with wrong password", function() {
      cy.get("#username").type("root_user");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();
      cy.get(".error")
        .should("contain", "Invalid username or password");
      cy.get(".error")
        .should("have.css", "color", "rgb(255, 0, 0)");
    });
    it("succeeds with correct credentials", function() {
      cy.get("#username").type("root_user");
      cy.get("#password").type("root_password");
      cy.get("#login-button").click();
      cy.contains(`Welcome ${user.name}`);
    });
  });
  describe("When logged in", function() {
    beforeEach(function() {
      cy.login({ username: user.username, password: user.password });
    });
    it("a new blog can be created", function() {
      const title = "a test blog created by cypress";

      cy.contains("create new blog").click();
      cy.get("#inputTitle").type(title);
      cy.get("#inputAuthor").type("cypress test");
      cy.get("#inputURL").type("cypress-test-blog.local");
      cy.get("#buttonCreate").click();
      cy.contains(title);
    });
  });
});