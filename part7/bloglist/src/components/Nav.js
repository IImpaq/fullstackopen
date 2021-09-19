import React from "react";
import {Link} from "react-router-dom";
import {logout} from "../reducers/userReducer";
import {notifyWith} from "../reducers/notificationReducer";
import {useDispatch} from "react-redux";

const Nav = ({ user }) => {
  const dispatch = useDispatch();

  const navStyle = {
    padding: 5,
    background: "lightgray"
  };

  const handleLogout = () => {
    if(user !== null) {
      dispatch(logout());
      dispatch(notifyWith(`Bye ${user.name}`, 5, false));
    }
  };

  return (
    <div style={navStyle}>
      <Link to="/">blogs</Link>
      <> </>
      <Link to="/users">users</Link>
      <> </>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  );
};

export default Nav;