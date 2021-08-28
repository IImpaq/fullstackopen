const User = require("../models/user");

const initialBlogs = [
  {
    author: "Genius",
    title: "Best book",
    url: "http://best-book.local",
    likes: 1,
  },
  {
    author: "Less Genius",
    title: "Another great book",
    url: "http://another-great-book.local",
    likes: 2,
  }
];

const usersInDB = async () => {
  const users = await User.find({});
  return users.map(user => user.toJSON());
};

module.exports = { initialBlogs, usersInDB };