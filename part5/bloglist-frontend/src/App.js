import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogServices from "./services/blogs";
import loginServices from "./services/login"

const App = () => {
  const [notMessage, setNotMessage] = useState(null);
  const [notError, setNotError] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect( () => {
    blogServices.getAll().then(blogs => {
      setBlogs(blogs);
    })
  });

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
      setUser(user);
      setUsername("");
      setPassword("");
    } catch(error) {
      notify(error.message, true);
      console.log(error);
    }
  }

  if(user === null) {
    return (
      <div>
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
              type="text" value={password} name="password"
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
      <Notification message={notMessage} error={notError} />
      <h2>Blogs</h2>
      <p>
        {user.name} logged in
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
};

export default App;
