import React from "react"

const EntryForm = (props) => {
  const {nameValue, numberValue,
          handleNameChange, handleNumberChange,
          handleClick} = props;

  return (
    <form>
      <div>
        name: <input value={nameValue} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={numberValue} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit" onClick={handleClick}>add</button>
      </div>
    </form>
  );
};

export default EntryForm;