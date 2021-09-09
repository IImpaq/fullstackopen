import React from "react";
import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { endNotification, notifyWith } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleCreateAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    const newAnecdote = await anecdoteService.createAnecdote(content);
    event.target.anecdote.value = "";
    dispatch(addAnecdote(newAnecdote));
    dispatch(notifyWith("you created '" + content + "'"));
    setTimeout(() => dispatch(endNotification()), 5000);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
