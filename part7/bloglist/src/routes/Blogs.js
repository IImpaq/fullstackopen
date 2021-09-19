import Toggleable from "../components/Toggleable";
import BlogForm from "../components/BlogForm";
import Blog from "../components/Blog";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteBlog, voteFor} from "../reducers/blogReducer";
import {notifyWith} from "../reducers/notificationReducer";
import {useHistory} from "react-router-dom";

const Blogs = ({ user, id }) => {
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  const history = useHistory();

  if (id !== null) {
    const blog = blogs.find(cur => cur.id === id);

    if (!blog) {
      return null;
    }

    const visibleForCreator = { display: user.username === blog.user.username
      ? ""
      : "none" };

    const handleLike = (event) => {
      event.preventDefault();
      try {
        dispatch(voteFor(blog));
        dispatch(notifyWith(`you liked '${blog.title}'`, 5));
      } catch(error) {
        console.error(error);
        dispatch(notifyWith("Failed liking blog", 5, true));
      }
    };

    const handleDelete = (event) => {
      event.preventDefault();

      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        try {
          dispatch(deleteBlog(blog.id));
          dispatch(notifyWith("Deleted blog", 5, false));
          history.push("/");
        } catch(error) {
          console.error(error);
          dispatch(notifyWith("Failed deleting blog", 5, true));
        }
      }
    };

    return (
      <div>
        <h2>{blog.title} by {blog.author}</h2>
        <p><a href={blog.url} target="_blank" rel="noreferrer">{blog.url}</a></p>
        likes: {blog.likes} <button onClick={handleLike} className="buttonLike">like</button><br />
        posted by: {blog.user.name}<br />
        <button style={visibleForCreator} onClick={handleDelete}>delete</button>
      </div>
    );
  }

  return (
    <div>
      <Toggleable openText="create new blog" closeText="cancel">
        <BlogForm />
      </Toggleable>
      <p/>
      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id}
          blog={blog} />
      )}
    </div>
  );
};

export default Blogs;