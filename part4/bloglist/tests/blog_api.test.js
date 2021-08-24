const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

describe("blog api tests", () => {
  test("number of blogs returned by api", async () => {
    const result = await api.get("/api/blogs");

    expect(result.body).toHaveLength(2);
  });
});