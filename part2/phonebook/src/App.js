import React, {useState} from "react"

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

  const personsToShow = 
    filter === "" ? persons
      : persons.filter(person => 
          person.name.includes(filter));

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
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
      <div>
        find a person: <input value={filter} onChange={handleFilter}/>
      </div>
      <h2>Add new entry</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          personsToShow.map(person => 
            <li key={person.name}>{person.name}: {person.number}</li>  
          )
        }
      </ul>
    </div>
  );
};

export default App;