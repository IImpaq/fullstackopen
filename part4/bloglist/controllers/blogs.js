const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const result = await Blog.find({});
  response.json(result);
});

blogsRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);

  if(blog) {
    response.json(blog.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.post("/", async (request, response) => {
  const body = request.body;
  if(body.title === undefined && body.url === undefined) {
    response.status(400).end();
    return;
  }

  if (body.likes === undefined) {
    body.likes = 0;
  }
  const blog = new Blog(body);
  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const body = request.body;
  const newBlog = { };

  if(body.author !== undefined) { newBlog.author = body.author; }
  if(body.title !== undefined) { newBlog.title = body.title; }
  if(body.url !== undefined) { newBlog.url = body.url; }
  if(body.likes !== undefined) { newBlog.likes = body.likes; }

  const result = await Blog.findByIdAndUpdate(id, newBlog, { new: true });
  if(result) {
    response.json(result.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const exists = await Blog.exists({ _id: id });
  if(!exists) {
    response.status(404).end();
    return;
  }

  const result = await Blog.findByIdAndRemove(id);
  response.status(204).json(result);
});

module.exports = blogsRouter;