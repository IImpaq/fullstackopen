const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const helper = require("../utils/test_helper");
const Blog = require("../models/blog");

beforeAll(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialNotes);
});

describe("getting blog posts", () => {
  test("and verifying the count returned by the api", async () => {
    const blogs = await api.get("/api/blogs").expect(200);
    expect(blogs.body).toHaveLength(helper.initialNotes.length);
  });
  test("and verifying that the variable 'id' exists", async () => {
    const blogs = await api.get("/api/blogs").expect(200);
    if(blogs.body.length >= 1)
      expect(blogs.body[0].id).toBeDefined();
  });
});

describe("adding a blog post", () => {
  test("with a proper request body", async () => {
    const samplePost = {
      title: "Jest Blog Post",
      author: "Jest",
      url: "http://jest.local/",
      likes: 1
    };
    const oldBlogs = await api.get("/api/blogs");
    const result = await api.post("/api/blogs").send(samplePost).expect(201);
    const newBlogs = await api.get("/api/blogs");

    expect(result.body).toStrictEqual({ ...samplePost, id: result.body.id });
    expect(newBlogs.body).toHaveLength(oldBlogs.body.length + 1);
  });
  test("when the likes property is missing", async () => {
    const samplePost = {
      title: "Jest Blog Post",
      author: "Jest",
      url: "http://jest.local/"
    };
    const result = await api.post("/api/blogs").send(samplePost).expect(201);
    expect(result.body.likes).toEqual(0);
  });
  test("when both the title and url property is missing", async () => {
    const samplePost = {
      author: "Jest"
    };
    await api.post("/api/blogs").send(samplePost).expect(400);
  });
});

describe("deleting a blog post", () => {
  let firstBlogID = "";

  test("with a valid id", async () => {
    const oldBlogs = await api.get("/api/blogs");
    firstBlogID = oldBlogs.body[0].id;
    await api.delete(`/api/blogs/${firstBlogID}`).expect(204);
    const newBlogs = await api.get("/api/blogs");
    expect(newBlogs.body).toHaveLength(oldBlogs.body.length - 1);
  });
  test("with an invalid id", async () => {
    const oldBlogs = await api.get("/api/blogs");
    await api.delete(`/api/blogs/${firstBlogID}`).expect(404);
    const newBlogs = await api.get("/api/blogs");
    expect(newBlogs.body).toHaveLength(oldBlogs.body.length);
  });
  test("without an id", async () => {
    const oldBlogs = await api.get("/api/blogs");
    await api.delete("/api/blogs/").expect(404);
    const newBlogs = await api.get("/api/blogs");
    expect(newBlogs.body).toHaveLength(oldBlogs.body.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});