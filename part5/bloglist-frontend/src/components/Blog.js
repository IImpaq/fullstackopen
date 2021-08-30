import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const visibleDetails = { display: showDetails ? "" : "none" };

  const toggleDetails = (event) => {
    event.preventDefault();
    setShowDetails(!showDetails);
  };

  const handleLike = (event) => {
    event.preventDefault();
    blog.likes = blog.likes + 1;
    updateBlog(blog.id, {
      likes: blog.likes
    });
    setCurrentLikes(blog.likes);
  };

  return (
    <div style={blogStyle}>
      <div>
        <strong>{blog.title}</strong> by {blog.author}
        <button onClick={toggleDetails}>{showDetails ? "hide" : "view"}</button>
      </div>
      <div style={visibleDetails}>
        available at {blog.url}<br />
        likes: {currentLikes} <button onClick={handleLike}>like</button><br />
        posted by: {blog.user.name}
      </div>
    </div>
  );
};

export default Blog;
