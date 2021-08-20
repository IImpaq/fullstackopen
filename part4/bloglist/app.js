const express = require("express");
const app = express();
const blogsRouter = require("./controllers/blogs");
const config = require("./utils/config");
const cors = require("cors");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

logger.info(`Connecting to MongoDB: ${config.MONGODB_URI}`);

// eslint-disable-next-line no-undef
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
};
mongoose.connect(config.MONGODB_URI, options);

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogsRouter);

module.exports = app;