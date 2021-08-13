import React, {useState} from "react"
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList"
import Filter from "./components/Filter"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "+43 123 456 7890123" },
    { name: "Ada Lovelace", number: "+43 124 456 7890123" },
    { name: "Dan Abramov", number: "+43 125 456 7890123" },
    { name: "Mary Poppendieck", number: "+43 126 456 7890123" }
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  
  const handleName = (event) => {
    setNewName(event.target.value);
  };

  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if(newName === "" || newNumber === "") {
      alert("Specify a name and a number please");
      return;
    }

    if(persons.find(person => 
        person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} was already added to the phonebook`);
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };
    setPersons(persons.concat(newPerson));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} handleChange={handleFilter}/>
      <h2>Add new entry</h2>
      <EntryForm
        nameValue={newName} numberValue={newNumber}
        handleNameChange={handleName} handleNumberChange={handleNumber}
        handleClick={addPerson}  
      />
      <h2>Numbers</h2>
      <EntryList persons={persons} filter={filter} />
    </div>
  );
};

export default App;