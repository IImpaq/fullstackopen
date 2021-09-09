const reducer = (state = [], action) => {
  switch(action.type) {
  case "VOTE":
  {
    const id = action.data.id;
    const anecdoteToChange = state.find(a => a.id === id);
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    };
    return state.map(anecdote =>
      anecdote.id === id ? changedAnecdote : anecdote
    );
  }
  case "ADD_ANECDOTE":
    return [...state, action.data];
  case "INIT_ANECDOTES":
    return action.data;
  default:
    return state;
  }
};

export const addAnecdote = (data) => {
  return {
    type: "ADD_ANECDOTE",
    data
  };
};

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: "INIT_ANECDOTES",
    data: anecdotes
  };
};

export const voteFor = (id) => {
  return {
    type: "VOTE",
    data: { id }
  };
};

export default reducer;
