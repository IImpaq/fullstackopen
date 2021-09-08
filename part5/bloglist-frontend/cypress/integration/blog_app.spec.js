describe("Blog app", function() {
  const user = {
    name: "root_name",
    username: "root_user",
    password: "root_password"
  };
  const blogUrl = "http://localhost:3000";

  function createBlog(isOpen, title, author, url) {
    if(!isOpen) { cy.contains("create new blog").click(); }
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
      createBlog(false,
        "a test blog created by cypress",
        "a test blog created by cypress",
        "cypress-test-blog.local"
      );
    });
    it("a user can like a blog", function() {
      createBlog(false,
        "a popular test blog created by cypress",
        "cypress test",
        "popular-cypress-test-blog.local");
      cy.contains("view").click();
      cy.contains("like").click();
    });
    it("users can delete own blog", function() {
      const title = "a popular test blog created by cypress";
      const author = "cypress test";
      const url = "popular-cypress-test-blog.local";
      createBlog(false, title, author, url);
      cy.contains("view").click();
      cy.contains("delete").click();
      createBlog(true, title, author, url);

      const newUser = {
        name: "admin_name",
        username: "admin_user",
        password: "admin_password"
      };
      cy.request("POST", "http://localhost:3003/api/users/", newUser);
      cy.contains("logout").click();
      cy.login({ username: newUser.username, password: newUser.password });
      cy.contains("view").click();
      cy.contains("delete").should("have.css", "display", "none");
    });
    it("blogs are sorted by likes", function() {
      const title = "a popular test blog created by cypress";
      const author = "cypress test";
      const url = "popular-cypress-test-blog.local";
      createBlog(false, title, author, url);
      createBlog(true, title + "2", author, url);
      cy.wait(500);
      cy.get(".buttonView").first().click();
      cy.get(".buttonLike").first().click();
      cy.get(".buttonView").last().click();
      cy.get(".buttonLike").last().click();
      cy.wait(500);
      cy.get(".buttonLike").last().click();
      cy.wait(500);
      cy.get(".blogTitle").first().contains(title + "2");
    });
  });
});