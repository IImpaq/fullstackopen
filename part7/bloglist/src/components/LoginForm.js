import Notification from "./Notification";
import React, {useState} from "react";
import {login} from "../reducers/userReducer";
import {notifyWith} from "../reducers/notificationReducer";
import {useDispatch} from "react-redux";
import {Button, TextField, Typography} from "@material-ui/core";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    console.log(`logging in with ${username} ${password}`);
    try {
      dispatch(login(username, password));
      dispatch(notifyWith(`Welcome ${username}`, 5, false));
      setUsername("");
      setPassword("");
    } catch(error) {
      dispatch(notifyWith("Invalid username or password", 5, true));
      console.error(error);
    }
  };

  return (
    <div>
      <Notification />
      <Typography variant="h2" style={{ paddingBottom: "2rem" }}>Log in to application</Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            label="username"
            variant="filled"
            type="text"
            value={username}
            name="username"
            id="username"
            onChange={({ target }) =>
              setUsername(target.value
              )}
          />
        </div>
        <div>
          <TextField
            label="password"
            variant="filled"
            type="password"
            value={password}
            name="password"
            id="password"
            onChange={({ target }) =>
              setPassword(target.value
              )}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          id="login-button">
          login
        </Button>
      </form>
    </div>
  );
};

export default Login;
