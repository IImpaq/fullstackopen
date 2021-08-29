const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User
    .find({})
    .populate("blogs", { user: 0 });
  response.json(users);
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  if(body.password === undefined || body.password.length < 3) {
    response.status(400).send({ error: "invalid password" });
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    name: body.name,
    username: body.username,
    passwordHash
  });

  const savedUser = await user.save();
  if(savedUser) {
    response.json(savedUser);
  } else {
    response.status(400).end();
  }
});

module.exports = usersRouter;
