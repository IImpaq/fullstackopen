import axios from "axios"

const serverUrl = "http://localhost:3001/persons";

const getAll = () => {
  return axios
          .get(serverUrl)
          .then(response => response.data);
};

const add = (person) => {
  return axios
          .post(serverUrl, person)
          .then(response => response.data);
};

export default { getAll, add };