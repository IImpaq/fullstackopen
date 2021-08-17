import React from "react"

const EntryList = ({persons, filter, handleClick}) => {
  const personsToShow = 
    filter === "" ? persons
      : persons.filter(person => 
          person.name.includes(filter));

  return (
    <ul>
    {
      personsToShow.map(person =>
        <li key={person.id}>
          {person.name}: {person.number}
          <button onClick={handleClick(person)}>delete</button>
        </li>  
      )
    }
    </ul>
  );
};

export default EntryList;