require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

// Custom logging messages
morgan.token("person", (request, response) => JSON.stringify(request.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :person"));

// Routing to information page
app.get("/info", (request, response) => {
  let time = new Date().toString();
  Person.find({}).then(result => {
    response.send(`<p>Phonebook has info of ${result.length} people<br/>${time}</p>`);
  });
});

// Defining the path to the REST API
const url = "/api/persons";

// Returns all entries in the phonebook
app.get(`${url}`, (request, response) => {
  Person.find({}).then(result => {
    response.json(result);
  });
});

// Custom error handler integrated as a middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  switch(error.name) {
    case "CastError":
      return response.status(400).send({ error: "malformatted id" });
    case "ValidationError":
      return response.status(400).json({ error: error.message })
  }

  next(error);
}

// Returns a single entry of the phonebook, accessed by id
app.get(`${url}/:id`, (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if(person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  }).catch(error => next(error));
});

// Adding a new entry to the phonebook, id will be generated automatically
app.post(`${url}`, (request, response, next) => {
  let body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(result => {
    response.json(result);
    console.log(`added ${result.name} with number ${result.number} to the phonebook`);
  }).catch(error => next(error));
});

// Deleting an entry in the phonebook, accessed by id
app.delete(`${url}/:id`, (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end();
  }).catch(error => next(error));
});

// Updating an entry in the phonebook, accessed by id
app.put(`${url}/:id`, (request, response, next) => {
  let body = request.body;

  const options = {new: true, runValidators: true};

  Person.findByIdAndUpdate(request.params.id, { number: body.number}, options)
    .then(result => {
      response.json(result);
    }).catch(error => next(error));
});

// Returns a HTTP 404 error if the endpoint is unknown
const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: "unknown endpoint" });
}
app.use(unknownEndpoint);

app.use(errorHandler);

// Starting the server using a predefined port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});