import axios from "axios";
const baseURL = "/api/blogs";

let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
}

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
};

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  };
  const response = await axios.post(baseURL, newBlog, config);
  return response.data;
};

export default { setToken, getAll, create };
