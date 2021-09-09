import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";
const getId = () => (100000 * Math.random()).toFixed(0);

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const changeAnecdote = async (id, data) => {
  const response = await axios.put(`${baseUrl}/${id}`, data);
  return response.data;
};

const createAnecdote = async (content) => {
  const anecdote = { content, id: getId(), votes: 0 };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

export default { getAll, changeAnecdote, createAnecdote };