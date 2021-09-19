import React, { useState } from "react";
import PropTypes from "prop-types";
import {deleteBlog, voteFor} from "../reducers/blogReducer";
import {notifyWith} from "../reducers/notificationReducer";
import {useDispatch} from "react-redux";

const Blog = ({ blog, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false);
  const dispatch = useDispatch();

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const visibleDetails = { display: showDetails ? "" : "none" };
  const visibleForCreator = { display: currentUser === blog.user.username
    ? ""
    : "none" };

  const toggleDetails = (event) => {
    event.preventDefault();
    setShowDetails(!showDetails);
  };

  const handleLike = (event) => {
    event.preventDefault();
    console.log("like ", blog.id);
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
      console.log("delete ", blog.id);
      try {
        dispatch(deleteBlog(blog.id));
        dispatch(notifyWith("Deleted blog", 5, false));
      } catch(error) {
        console.error(error);
        dispatch(notifyWith("Failed deleting blog", 5, true));
      }
    }
  };

  return (
    <div style={blogStyle}>
      <div>
        <strong className="blogTitle">{blog.title}</strong> by {blog.author}
        <button onClick={toggleDetails} className="buttonView">{showDetails ? "hide" : "view"}</button>
      </div>
      <div style={visibleDetails} className="blogDetails">
        available at {blog.url}<br />
        likes: {blog.likes} <button onClick={handleLike} className="buttonLike">like</button><br />
        posted by: {blog.user.name}<br />
        <button style={visibleForCreator} onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  currentUser: PropTypes.string.isRequired
};

export default Blog;
