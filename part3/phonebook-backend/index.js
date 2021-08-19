require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

morgan.token("person", (request, response) => JSON.stringify(request.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :person"));

app.get("/info", (request, response) => {
  let time = new Date().toString();
  Person.find({}).then(result => {
    response.send(`<p>Phonebook has info of ${result.length} people<br/>${time}</p>`);
  });
});

const url = "/api/persons";

app.get(`${url}`, (request, response) => {
  Person.find({}).then(result => {
    response.json(result);
  });
});

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if(error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
}

app.get(`${url}/:id`, (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if(person) {
      response.json(person);
    } else {
      response.status(404).end();
    }
  }).catch(error => next(error));
});

app.post(`${url}`, (request, response, next) => {
  let body = request.body;

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing"
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(result => {
    response.json(result);
    console.log(`added ${result.name} with number ${result.number} to the phonebook`);
  }).catch(error => next(error));
});

app.delete(`${url}/:id`, (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).then(result => {
    response.status(204).end();
  }).catch(error => next(error));
});

app.put(`${url}/:id`, (request, response, next) => {
  let body = request.body;

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing"
    });
  }

  const personToUpdate = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(request.params.id, personToUpdate, {new: true})
    .then(result => {
      response.json(result);
    }).catch(error => next(error));
});

const unknownEndpoint = (request, response) => {
  return response.status(404).send({ error: "unknown endpoint" });
}
app.use(unknownEndpoint);

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});