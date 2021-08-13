import React from "react"

const EntryList = ({persons, filter}) => {
  const personsToShow = 
    filter === "" ? persons
      : persons.filter(person => 
          person.name.includes(filter));

  return (
    <ul>
    {
      personsToShow.map(person => 
        <li key={person.name}>{person.name}: {person.number}</li>  
      )
    }
    </ul>
  );
};

export default EntryList;