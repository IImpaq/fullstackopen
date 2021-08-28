const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const helper = require("../utils/test_helper");
const User = require("../models/user");

beforeAll(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash("root_password", 10);
  const user = new User({
    name: "root_name",
    username: "root",
    passwordHash
  });

  await user.save();
});

describe("getting all users", () => {
  test("and verifying that the count is correct", async () => {
    const users = await api.get("/api/users/").expect(200);
    const expectedUsers = await helper.usersInDB();
    expect(users.body).toHaveLength(expectedUsers.length);
  });
});

describe("creating a new user", () => {
  test("with a valid request body", async () => {
    const oldUsers = await helper.usersInDB();

    const user = {
      name: "admin_name",
      username: "admin",
      password: "admin_password"
    };

    await api.post("/api/users/")
      .send(user)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    const newUsers = await helper.usersInDB();
    expect(newUsers).toHaveLength(oldUsers.length + 1);
    expect(newUsers.map(users => users.username)).toContain(user.username);
  });
  test("with an invalid username", async () => {
    const oldUsers = await helper.usersInDB();

    const user = {
      name: "superuser_name",
      username: "su",
      password: "superuser_password"
    };

    await api.post("/api/users/")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const newUsers = await helper.usersInDB();
    expect(newUsers).toHaveLength(oldUsers.length);
  });
  test("with an invalid password", async () => {
    const oldUsers = await helper.usersInDB();

    const user = {
      name: "superuser_name",
      username: "superuser",
      password: "pw"
    };

    await api.post("/api/users/")
      .send(user)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const newUsers = await helper.usersInDB();
    expect(newUsers).toHaveLength(oldUsers.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});