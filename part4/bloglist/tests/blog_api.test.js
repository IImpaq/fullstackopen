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
  test("that a post request creates a new blog post", async () => {
    const samplePost = {
      title: "Jest Blog Post",
      author: "Jest",
      url: "http://jest.local/",
      likes: 1
    };

    const old_blogs = await api.get("/api/blogs");
    const result = await api.post("/api/blogs").send(samplePost);
    const new_blogs = await api.get("/api/blogs");

    expect(result.body).toStrictEqual({ ...samplePost, id: result.body.id });
    expect(new_blogs.body).toHaveLength(old_blogs.body.length + 1);
  });
});