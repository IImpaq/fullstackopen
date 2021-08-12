import React, {useState} from "react";

const Anecdote = ({current}) => {
  return (
    <>
      <p>{current.text}</p>
      <p>has {current.votes} votes</p>
    </>
  );
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
}

const Section = ({title, anecdote}) => {
  return (
    <>
      <h1>{title}</h1>
      <Anecdote current={anecdote} />
    </>
  );
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      text: "If it hurts, do it more often",
      votes: 0
    },
    {
      text: "Adding manpower to a late software project makes it later!",
      votes: 0
    },
    {
      text: "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
      votes: 0
    },
    {
      text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
      votes: 0
    },
    {
      text: "Premature optimization is the root of all evil.",
      votes: 0
    },
    {
      text: "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
      votes: 0
    },
    {
      text: "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
      votes: 0
    }
  ]);

  const randomIndex = () => () => {
    return Math.floor(Math.random() * anecdotes.length);
  }

  const [selected, setSelected] = useState(randomIndex());
  const [highestIndex, setHighestIndex] = useState(selected);

  const addVote = () => () => {
    const temp = [...anecdotes];
    temp[selected] = {
      text: anecdotes[selected].text,
      votes: anecdotes[selected].votes + 1
    };

    for(let i = 0; i < temp.length; ++i) {
      if(temp[i].votes > temp[highestIndex].votes) {
        setHighestIndex(i);
      }
    } 

    setAnecdotes(temp);
  }

  return (
    <div>
      <Section 
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
      />
      <Button 
        handleClick={addVote()}
        text="vote"
      />
      <Button 
        handleClick={() => setSelected(randomIndex())}
        text="next anecdote"
      />
      <Section 
        title="Anecdote with most votes"
        anecdote={anecdotes[highestIndex]}
      />
    </div>
  );
}

export default App;
