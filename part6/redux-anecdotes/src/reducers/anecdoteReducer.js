import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch(action.type) {
  case "VOTE":
  {
    const id = action.data.id;
    return state.map(anecdote =>
      anecdote.id === id ? action.data : anecdote
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

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    dispatch({
      type: "ADD_ANECDOTE",
      data: newAnecdote
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes
    });
  };
};

export const voteFor = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.changeAnecdote(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1
    });
    dispatch({
      type: "VOTE",
      data: newAnecdote
    });
  };
};

export default reducer;
