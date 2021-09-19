import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import { notifyWith } from "./reducers/notificationReducer";
import { initBlogs } from "./reducers/blogReducer";
import Toggleable from "./components/Toggleable";
import blogServices from "./services/blogs";
import loginServices from "./services/login";
import {connect, useDispatch, useSelector} from "react-redux";

const App = (props) => {
  const blogs = useSelector(state => state.blogs);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if(loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogServices.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(`logging in with ${username} ${password}`);
    try {
      const user = await loginServices.login({
        username, password
      });
      window.localStorage.setItem("loggedInUser", JSON.stringify(user));
      blogServices.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      props.notifyWith(`Welcome ${user.name}`, 5, false);
    } catch(error) {
      props.notifyWith("Invalid username or password", 5, true);
      console.error(error);
    }
  };

  const handleLogout = () => {
    if(user !== null) {
      window.localStorage.removeItem("loggedInUser");
      blogServices.setToken(null);
      props.notifyWith(`Bye ${user.name}`, 5, false);
      setUser(null);
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

  return (
    <div>
      <Notification />
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Toggleable openText="create new blog" closeText="cancel">
        <BlogForm />
      </Toggleable>
      <p/>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id}
          blog={blog}
          currentUser={user.username} />
      )}
    </div>
  );
};

const mapDispatchToProps = {
  notifyWith
};

const ConnectedApp = connect(null, mapDispatchToProps)(App);
export default ConnectedApp;
