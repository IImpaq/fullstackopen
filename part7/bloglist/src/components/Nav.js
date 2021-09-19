import React from "react";
import {Link} from "react-router-dom";
import {logout} from "../reducers/userReducer";
import {notifyWith} from "../reducers/notificationReducer";
import {useDispatch} from "react-redux";
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";

const Nav = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    if(user !== null) {
      dispatch(logout());
      dispatch(notifyWith(`Bye ${user.name}`, 5, false));
    }
  };

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Button color="primary" variant="outlined">
          <Link to="/">blogs</Link>
        </Button>
        <Button color="primary" variant="outlined">
          <Link to="/users">users</Link>
        </Button>
        <Typography variant="h6" style={{ padding: "0 1rem", fontSize: "1.1rem" }}>
          {user.name} logged in
        </Typography>
        <Button color="secondary" variant="contained" onClick={handleLogout}>logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Nav;