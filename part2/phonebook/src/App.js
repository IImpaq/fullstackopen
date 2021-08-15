import React, {useState, useEffect} from "react"
import EntryForm from "./components/EntryForm"
import EntryList from "./components/EntryList"
import Filter from "./components/Filter"
import Notification from "./components/Notification"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notMessage, setNotMessage] = useState(null);
  const [notError, setNotError] = useState(false);

  const notify = (message, error) => {
    setNotMessage(message);
    setNotError(error);
    setTimeout(() => {
      setNotMessage(null);
    }, 5000);
  };

  useEffect(() => {
    personService.getAll()
      .then(response => {
        setPersons(response);
      })
      .catch(error => {
        console.log(error);
        notify("Loading the phonebook failed, check console for details!", true);
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
      notify("Specify a name and a number please!", true);
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
      notify(`Added ${response.name} to the phonebook!`, false);
      setPersons(persons.concat(response));
    })
    .catch(error => {
      console.log(error);
      notify(`Adding ${newName} to the phonebook failed, check console for details!`, true);
    });
  };

  const updatePerson = (personToUpdate) => {
    if(!window.confirm(`${personToUpdate.name} is already added in the phonebook, replace the old number with a new one?`)) {
      return;
    }

    const newPerson = { ...personToUpdate, number: newNumber };    

    personService
      .update(newPerson)
      .then(response => {
        notify(`Changed ${response.name}'s number from ${personToUpdate.number} to ${response.number}!`, false);
        setPersons(persons.map(person => person.id !== response.id ? person : response));
      })
      .catch(error => {
        console.log(error);
        notify(`Updating ${newPerson.name} in the phonebook failed, check console for details!`, true);
      });
  };

  const deletePerson = (personToDelete) => () => {
    if(!window.confirm(`Are you sure you want to delete ${personToDelete.name}`)) {
      return;
    }

    personService
        .remove(personToDelete.id)
        .then(response => {
            notify(`Deleted ${response.name} from the phonebook!`, false);
            setPersons(persons.filter(person => person.id !== response.id));

        })
        .catch(error => {
            console.log(error);
            notify(`Deleting ${personToDelete.name} from the phonebook failed, check console for details!`, true);
        })
  };

  return (
    <div>
      <Notification message={notMessage} error={notError} />
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