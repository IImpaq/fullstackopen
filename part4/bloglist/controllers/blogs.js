const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");

const getTokenFrom = request => {
  const authorization = request.get("authorization");
  if(authorization && authorization.toLowerCase().startsWith("bearer")) {
    return authorization.substring(7);
  }
  return null;
};

blogsRouter.get("/", async (request, response) => {
  const result = await Blog
    .find({})
    .populate("user", { username: 1, name: 1 });
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

  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, config.SECRET);
  if(!token || !decodedToken) {
    return response
      .status(401)
      .json({ error: "Invalid or missing token" });
  }
  const user = await User.findById(decodedToken.id);

  if (body.likes === undefined) {
    body.likes = 0;
  }
  const blog = new Blog({ ...body, user: user._id });
  const result = await blog.save();
  user.blogs = user.blogs.concat(result._id);
  await user.save();

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