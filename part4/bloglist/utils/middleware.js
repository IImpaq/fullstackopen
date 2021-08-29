const logger = require("./logger");

const unknownEndpoint = (request, response) => {
  response.status(404).send({  error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  switch(error.name) {
  case "CastError":
    return response.status(400).send({ error: "malformed id" });
  case "ValidationError":
    return response.status(400).json({ error: error.message });
  case "JsonWebTokenError":
    return response.status(401).json({ error: "invalid or missing token" });
  default:
    logger.error(error.message);
    next(error);
  }
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");

  request.token =
    authorization && authorization.toLowerCase().startsWith("bearer")
      ? request.token = authorization.substring(7)
      : null;

  next();
};

module.exports = { unknownEndpoint, errorHandler, tokenExtractor };