const express = require("express");
const app = express();

app.use(express.json());

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

const randomID = (shouldVerify) => {
    let id = Math.floor(Math.random() * 9999);
    
    if(!shouldVerify) {
        return id;
    } else {
        let result = persons.find(person => person.id === id);
        if(!result) {
            return id;
        } else {
            return randomID(shouldVerify);
        }
    }
}

app.get("/info", (request, response) => {
    let count = persons.length;
    let time = new Date().toString();
    response.send(`<p>Phonebook has info of ${count} people<br/>${time}</p>`);
});

app.get("/api/persons", (request, response) => {
    response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
    let id = Number(request.params.id);
    let person = persons.find(person => person.id === id);

    if(person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
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
})

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

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});