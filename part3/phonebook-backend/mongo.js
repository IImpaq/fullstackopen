const mongoose = require("mongoose")

const showInfoMessages = () => {
  console.log("Wrong number of arguments:");
  console.log("-> To list all entries, provide the following arguments: node mongo.js <password>");
  console.log("-> To add a new entry, provide the following arguments: node mongo.js <password> <name> <number>");
  process.exit(1);
}

if(process.argv.length < 3) {
    showInfoMessages();
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack:${password}@cluster0.tpe9p.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model("Person", personSchema);

if(process.argv.length === 3) {
  console.log("phonebook:");
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person);
    });

    mongoose.connection.close();
  });
} else if(process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const person = new Person({
    name: name,
    number: number
  });

  person.save().then(result => {
    console.log(`added ${result.name} with number ${result.number} to the phonebook`);
    mongoose.connection.close();
  });
} else {
  showInfoMessages();
}