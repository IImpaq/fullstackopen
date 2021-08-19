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

  const person = new Person({
    name: body.name,
    number: body.number
  });

  person.save().then(result => {
    console.log(`added ${result.name} with number ${result.number} to the phonebook`);
  });

  response.json(person);
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndDelete(request.params.id).then(result => {
    response.json(result);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});