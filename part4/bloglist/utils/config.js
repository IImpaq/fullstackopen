/* eslint-disable no-undef */
require("dotenv").config();

const NODE_ENV = process.env.NODE_ENV;
const MONGODB_URI = process.env.NODE_ENV === "test"
  ? process.env.MONGODB_TEST_URI
  : process.env.MONGODB_URI;
const PORT = process.env.PORT;
const SECRET = process.env.SECRET;

module.exports = { NODE_ENV, MONGODB_URI, PORT, SECRET };