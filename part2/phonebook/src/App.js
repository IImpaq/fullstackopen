import React, {useState} from "react"

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" }
  ]);
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if(persons.find(person => 
        person.name.toLowerCase() === newName.toLowerCase())) {
      alert(`${newName} was already added to the phonebook`);
      return;
    }

    const newPerson = {
      name: newName
    };
    setPersons(persons.concat(newPerson));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit" onClick={addPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(person => 
            <li key={person.name}>{person.name}</li>  
          )
        }
      </ul>
    </div>
  );
};

export default App;