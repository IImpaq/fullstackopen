import React from "react"

const Filter = ({value, handleChange}) => {
  return (
    <div>
    find a person: <input value={value} onChange={handleChange}/>
    </div>
  );
};

export default Filter;