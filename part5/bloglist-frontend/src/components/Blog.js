import React, { useState } from "react";

const Blog = ({blog}) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const visibleDetails = { display: showDetails ? "" : "none" };

  const toggleDetails = (event) => {
    event.preventDefault();
    setShowDetails(!showDetails);
  }

  return (
    <div style={blogStyle}>
      <div>
        <strong>{blog.title}</strong> by {blog.author}
        <button onClick={toggleDetails}>{showDetails ? "hide" : "view"}</button>
      </div>
      <div style={visibleDetails}>
        available at {blog.url}<br />
        likes: {blog.likes}<br />
        posted by: {blog.user.name}
      </div>
    </div>
  );
};

export default Blog;
