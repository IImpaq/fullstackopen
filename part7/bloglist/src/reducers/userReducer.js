import loginServices from "../services/login";
import blogServices from "../services/blogs";

const initialState = {
  username: null,
  name: null,
  token: null
};

const userReducer = (state = initialState, action) => {
  switch(action.type) {
  case "LOGIN":
    return action.data;
  case "LOGOUT":
    return null;
  default:
    return state;
  }
};

export const login = (username, password) => {
  return async dispatch => {
    const user = await loginServices.login({
      username, password
    });
    if(user !== null) {
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogServices.setToken(user.token);
    }
    dispatch({
      type: "LOGIN",
      data: user
    });
  };
};

export const reLogin = () => {
  return async dispatch => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    let user = null;
    if(loggedInUser) {
      user = JSON.parse(loggedInUser);
      blogServices.setToken(user.token);
    }
    dispatch({
      type: "LOGIN",
      data: user
    });
  };
};

export const logout = () => {
  return dispatch => {
    window.localStorage.removeItem("loggedInUser");
    blogServices.setToken(null);
    dispatch({
      type: "LOGOUT"
    });
  };
};

export default userReducer;
