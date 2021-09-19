import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import { notifyWith } from "./reducers/notificationReducer";
import Toggleable from "./components/Toggleable";
import blogServices from "./services/blogs";
import loginServices from "./services/login";
import blogService from "./services/blogs";
import {connect} from "react-redux";

const App = (props) => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect( () => {
    blogServices.getAll().then(blogs => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInUser");
    if(loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogServices.setToken(user.token);
    }
  }, []);

  const notify = (message, error) => {
    props.notifyWith(message, 5, error);
  };

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
      notify(`Welcome ${user.name}`, false);
    } catch(error) {
      notify("Invalid username or password", true);
      console.error(error);
    }
  };

  const handleLogout = () => {
    if(user !== null) {
      window.localStorage.removeItem("loggedInUser");
      blogServices.setToken(null);
      notify(`Bye ${user.name}`, false);
      setUser(null);
    }
  };

  const createBlog = async (blogToCreate) => {
    try {
      const newBlog = await blogServices.create(blogToCreate);
      setBlogs(blogs.concat({ ...newBlog, user }));
      notify(`Created new blog: ${newBlog.title} by ${newBlog.author}`, false);
    } catch(error) {
      notify("Failed creating a new blog", true);
      console.error(error);
    }
  };

  const updateBlog = async (id, blogToUpdate) => {
    try {
      await blogService.update(id, blogToUpdate);
      setBlogs(blogs.map(blog => {
        return blog.id === id
          ? { ...blog, ...blogToUpdate }
          : blog;
      }));
    } catch(error) {
      console.error(error);
      notify("Failed liking blog", true);
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogServices.remove(id);
      setBlogs(blogs.filter(blog => blog.id !== id));
      notify("Deleted blog", false);
    } catch(error) {
      console.error(error);
      notify("Failed deleting blog", true);
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
        <BlogForm createBlog={createBlog} />
      </Toggleable>
      <p/>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          removeBlog={removeBlog}
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
