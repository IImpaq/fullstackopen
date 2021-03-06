import usersServices from "../services/users";

const usersReducer = (state = [], action) => {
  switch(action.type) {
  case "GET_USERS":
    return action.data;
  default:
    return state;
  }
};

export const getUsers = () => {
  return async dispatch => {
    const users = await usersServices.getAll();
    dispatch({
      type: "GET_USERS",
      data: users
    });
  };
};

export default usersReducer;