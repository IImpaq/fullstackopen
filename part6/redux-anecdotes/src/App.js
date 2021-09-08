import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {addAnecdote, voteFor} from "./reducers/anecdoteReducer";

const App = () => {
  const anecdotes = useSelector(state => state);
  const dispatch = useDispatch();

  const createAnecdote = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdote(content));
  };

  const vote = (id) => {
    console.log("vote ", id);
    dispatch(voteFor(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.sort((prev, curr) => curr.votes - prev.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default App;
