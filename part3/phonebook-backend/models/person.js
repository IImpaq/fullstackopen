const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Retrieving the predefined url to mongodb
// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI;

console.log(`Connecting to MongoDB: ${url}`);

// Connecting to mongodb using mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log("Connected to MongoDB");
  }).catch(error => {
    console.log("Failed connecting to MongoDB:", error);
  });

// Defining a person schema for storing documents
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true
  }
});
personSchema.plugin(uniqueValidator); // Plugin to verify if property is unique

// Custom response when calling toJSON function
personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

// Exporting a mongoose model for a Person based on the defined schema
module.exports = mongoose.model("Person", personSchema);