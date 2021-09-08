describe("Blog app", function() {
  const user = {
    name: "root_name",
    username: "root_user",
    password: "root_password"
  };
  const blogUrl = "http://localhost:3000";

  function createBlog(title, author, url) {
    cy.contains("create new blog").click();
    cy.get("#inputTitle").type(title);
    cy.get("#inputAuthor").type(author);
    cy.get("#inputURL").type(url);
    cy.get("#buttonCreate").click();
    cy.contains(title);
  }
  function checkErrorNotification(text, color) {
    cy.get(".error")
      .should("contain", text);
    cy.get(".error")
      .should("have.css", "color", color);
  }

  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.request("POST", "http://localhost:3003/api/users/", user);
    cy.visit(blogUrl);
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
      checkErrorNotification("Invalid username or password", "rgb(255, 0, 0)");
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
      createBlog(
        "a test blog created by cypress",
        "a test blog created by cypress",
        "cypress-test-blog.local"
      );
    });
    it("all users can like a blog", function() {
      const title = "a popular test blog created by cypress";
      createBlog(title,
        "cypress test",
        "popular-cypress-test-blog.local");
      cy.contains("view").click();
      cy.contains("like").click();
    });
  });
});