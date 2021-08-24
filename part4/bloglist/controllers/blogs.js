const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const result = await Blog.find({});
  response.json(result);
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