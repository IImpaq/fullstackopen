import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogServices from "./services/blogs";
import loginServices from "./services/login"

const App = () => {
  const [notMessage, setNotMessage] = useState(null);
  const [notError, setNotError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogURL, setBlogURL] = useState("");

  useEffect( () => {
    blogServices.getAll().then(blogs => {
      setBlogs(blogs);
    })
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
    setNotMessage(message);
    setNotError(error);
    setTimeout(() => {
      setNotMessage(null);
    }, 5000);
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

  const handleBlogCreation = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogServices.create({
        title: blogTitle,
        author: blogAuthor,
        url: blogURL
      });
      setBlogs(blogs.concat(newBlog))
      setBlogTitle("");
      setBlogAuthor("");
      setBlogURL("");
      notify(`Created new blog: ${newBlog.title} by ${newBlog.author}`, false);
    } catch(error) {
      notify("Failed creating a new blog", true);
      console.error(error);
    }
  };

  if(user === null) {
    return (
      <div>
        <Notification message={notMessage} isError={notError} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text" value={username} name="username"
              onChange={({ target }) =>
                setUsername(target.value
                )}
            />
          </div>
          <div>
            password
            <input
              type="password" value={password} name="password"
              onChange={({ target }) =>
                setPassword(target.value
                )}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification message={notMessage} isError={notError} />
      <h2>Blogs</h2>
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <Toggleable openText="create new blog" closeText="cancel">
        <h2>create new</h2>
        <form onSubmit={handleBlogCreation}>
          <div>
            title: <input value={blogTitle} name="blogTitle"
                          onChange={({target}) =>
                            setBlogTitle(target.value)
                          } />
          </div>
          <div>
            author: <input value={blogAuthor} name="blogAuthor"
                           onChange={({target}) =>
                             setBlogAuthor(target.value)
                           } />
          </div>
          <div>
            url: <input value={blogURL} name="blogURL"
                        onChange={({target}) =>
                          setBlogURL(target.value)
                        } />
          </div>
          <button type="submit">create</button>
        </form>
      </Toggleable>
      <p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </p>
    </div>
  );
};

export default App;
