import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import { notifyWith } from "./reducers/notificationReducer";
import { initBlogs } from "./reducers/blogReducer";
import {login, logout, reLogin} from "./reducers/userReducer";
import Toggleable from "./components/Toggleable";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const blogs = useSelector(state => state.blogs);
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

  const handleLogout = () => {
    if(user !== null) {
      dispatch(logout());
      dispatch(notifyWith(`Bye ${user.name}`, 5, false));
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

export default App;
