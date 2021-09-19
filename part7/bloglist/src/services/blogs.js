import axios from "axios";
const baseURL = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const getConfig = () => { return { headers: { Authorization: token } }; };

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

const create = async newBlog => {
  const response = await axios.post(baseURL, newBlog, getConfig());
  return response.data;
};

const update = async (id, updatedBlogData) => {
  const response = await axios.put(`${baseURL}/${id}`, updatedBlogData, getConfig());
  return response.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}`, getConfig());
  return response.data;
};

export default { setToken, getAll, create, update, remove };
