import React, { useState, useEffect } from "react";
import Notification from "./components/Notification";
import { notifyWith } from "./reducers/notificationReducer";
import { initBlogs } from "./reducers/blogReducer";
import {login, reLogin} from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import Blogs from "./routes/Blogs";
import Users from "./routes/Users";
import Nav from "./components/Nav";

const App = () => {
  const user = useSelector(state => state.user);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reLogin());
  }, []);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

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

  if(user === null) {
    return (
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text" value={username} name="username" id="username"
              onChange={({ target }) =>
                setUsername(target.value
                )}
            />
          </div>
          <div>
            password
            <input
              type="password" value={password} name="password" id="password"
              onChange={({ target }) =>
                setPassword(target.value
                )}
            />
          </div>
          <button type="submit" id="login-button">login</button>
        </form>
      </div>
    );
  }

  const userMatch = useRouteMatch("/users/:id");
  const userId = userMatch ? userMatch.params.id : null;

  const blogMatch = useRouteMatch("/blogs/:id");
  const blogId = blogMatch ? blogMatch.params.id : null;

  return (
    <div>
      <Nav user={user} />
      <Notification />
      <h2>Blogs</h2>
      <Switch>
        <Route path="/users/:id">
          <Users id={userId} />
        </Route>
        <Route path="/users">
          <Users id={userId} />
        </Route>
        <Route path="/blogs/:id">
          <Blogs user={user} id={blogId} />
        </Route>
        <Route path="/">
          <Blogs user={user} id={blogId} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
