require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

morgan.token("person", (request, response) => JSON.stringify(request.body));
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :person"));

let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get("/info", (request, response) => {
  let time = new Date().toString();
  Person.find({}).then(result => {
    response.send(`<p>Phonebook has info of ${result.length} people<br/>${time}</p>`);
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then(result => {
    response.json(result);
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person);
  });
});

app.post("/api/persons", (request, response) => {
  let body = request.body;

  if(!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing"
    });
  }

  if(persons.find(person => person.name === body.name)) {
    return response.status(409).json({
      error: "name must be unique"
    });
  }

  let person = {
    id: randomID(true),
    name: body.name,
    number: body.number
  };

  persons = persons.concat(person);

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  let id = Number(request.params.id);
  let person = persons.find(person => person.id === id);

  if(person) {
    persons = persons.filter(person => person.id !== id);
    response.json(person);
  } else {
    response.status(404).end();
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});