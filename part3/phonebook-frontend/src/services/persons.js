import axios from "axios"

const serverUrl = "/api/persons";

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

const update = (person) => {
  return axios
          .put(`${serverUrl}/${person.id}`, person)
          .then(response => response.data);

};

const remove = (id) => {
  return axios
          .delete(`${serverUrl}/${id}`)
          .then(response => response.data);
};

export default { getAll, add, update, remove };