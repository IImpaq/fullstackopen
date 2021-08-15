import React, {useState, useEffect} from "react"
import EntryForm from "./components/EntryForm"
import EntryList from "./components/EntryList"
import Filter from "./components/Filter"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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

    const temp = persons.find(person => 
      person.name.toLowerCase() === newName.toLowerCase());
    if(temp) {
      updatePerson(temp)
      return;
    }

    const newPerson = {
      name: newName,
      number: newNumber
    };

    personService.add(newPerson)
    .then(response => {
      setPersons(persons.concat(response));
    });
  };

  const updatePerson = (personToUpdate) => {
    if(!window.confirm(`${personToUpdate.name} is already added in the phonebook, replace the old number with a new one?`)) {
      console.log("canceled updating number of person", personToUpdate.id);
      return;
    }

    const newPerson = { ...personToUpdate, number: newNumber };    

    personService
      .update(newPerson)
      .then(response => {
        setPersons(persons.map(person => person.id !== personToUpdate.id ? person : response));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deletePerson = (personToDelete) => () => {
    if(!window.confirm(`Are you sure you want to delete ${personToDelete.name}`)) {
      return;
    }

    personService
        .remove(personToDelete.id)
        .then(response => {
            console.log(`deleted person ${response}`);
            setPersons(persons.filter(person => person.id !== personToDelete.id));
        })
        .catch(error => {
            console.log(error);
        })
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
      <EntryList persons={persons} filter={filter} handleClick={deletePerson} />
    </div>
  );
};

export default App;