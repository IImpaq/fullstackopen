const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("blog api tests", () => {
  test("the number of blogs returned by api", async () => {
    const blogs = await api.get("/api/blogs");
    expect(blogs.body).toHaveLength(2);
  });
  test("that the variable 'id' is defined", async () => {
    const blogs = await api.get("/api/blogs");
    if(blogs.body.length >= 1)
      expect(blogs.body[0].id).toBeDefined();
  });
});