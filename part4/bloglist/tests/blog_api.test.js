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
  let firstBlogID = "";

  test("and verifying the count returned by the api", async () => {
    const blogs = await api.get("/api/blogs").expect(200);
    firstBlogID = blogs.body[0].id;
    expect(blogs.body).toHaveLength(helper.initialNotes.length);
  });
  test("and verifying that the variable 'id' exists", async () => {
    const blogs = await api.get("/api/blogs").expect(200);
    if(blogs.body.length >= 1)
      expect(blogs.body[0].id).toBeDefined();
  });
  test("and verifying that the response is correct", async () => {
    const blog = await api.get(`/api/blogs/${firstBlogID}`).expect(200);
    expect(blog.body).toStrictEqual({ ...helper.initialNotes[0], id: blog.body.id });
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

describe("updating a blog post", () => {
  let firstBlogID = "";

  test("with a valid id and all properties changed", async () => {
    const blogs = await api.get("/api/blogs");
    firstBlogID = blogs.body[0].id;
    const updatedBlog = {
      author: "Updated Author",
      title: "Updated Title",
      url: "http://updated-url.local",
      likes: 100
    };
    const result = await api.put(`/api/blogs/${firstBlogID}`)
      .send(updatedBlog)
      .expect(200);
    expect(result.body).toStrictEqual({ ...updatedBlog, id: result.body.id });
  });
  test("with a valid id and one property changed", async () => {
    const blogs = await api.get("/api/blogs");
    firstBlogID = blogs.body[0].id;
    const updatedBlog = {
      likes: 200
    };
    const result = await api.put(`/api/blogs/${firstBlogID}`)
      .send(updatedBlog)
      .expect(200);
    expect(result.body).toStrictEqual({ ...result.body, likes: updatedBlog.likes });
  });
  test("with an invalid id", async () => {
    firstBlogID = mongoose.Types.ObjectId();
    const updatedBlog = {
      likes: 200
    };
    await api.put(`/api/blogs/${firstBlogID}`).send(updatedBlog).expect(404);
  });
});

describe("deleting a blog post", () => {
  test("with a valid id", async () => {
    const oldBlogs = await api.get("/api/blogs");
    const firstBlogID = oldBlogs.body[0].id;
    await api.delete(`/api/blogs/${firstBlogID}`).expect(204);
    const newBlogs = await api.get("/api/blogs");
    expect(newBlogs.body).toHaveLength(oldBlogs.body.length - 1);
  });
  test("with an invalid id", async () => {
    const oldBlogs = await api.get("/api/blogs");
    const invalidID = mongoose.Types.ObjectId();
    await api.delete(`/api/blogs/${invalidID}`).expect(404);
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