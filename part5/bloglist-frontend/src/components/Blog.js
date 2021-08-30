import React, { useState } from "react";

const Blog = ({ blog, updateBlog, removeBlog, currentUser }) => {
  const [showDetails, setShowDetails] = useState(false);

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
    updateBlog(blog.id, {
      likes: blog.likes + 1
    });
  };

  const handleDelete = (event) => {
    event.preventDefault();
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      removeBlog(blog.id);
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        <strong>{blog.title}</strong> by {blog.author}
        <button onClick={toggleDetails}>{showDetails ? "hide" : "view"}</button>
      </div>
      <div style={visibleDetails}>
        available at {blog.url}<br />
        likes: {blog.likes} <button onClick={handleLike}>like</button><br />
        posted by: {blog.user.name}<br />
        <button style={visibleForCreator} onClick={handleDelete}>delete</button>
      </div>
    </div>
  );
};

export default Blog;
