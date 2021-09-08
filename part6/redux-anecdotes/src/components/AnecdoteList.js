import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { voteFor } from "../reducers/anecdoteReducer";
import { endNotification, notifyWith } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes);
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote ", id);
    dispatch(voteFor(id));
    dispatch(
      notifyWith(
        "you voted '" +
        anecdotes.find(anecdote => anecdote.id === id).content + "'"
      )
    );
    setTimeout(() => dispatch(endNotification()), 5000);
  };

  return (
    <div>
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
    </div>
  );
};

export default AnecdoteList;