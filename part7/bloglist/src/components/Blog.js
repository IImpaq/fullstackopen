import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {Divider, ListItem, ListItemText} from "@material-ui/core";

const Blog = ({ blog }) => {
  return (
    <>
      <ListItem>
        <ListItemText><Link to={`/blogs/${blog.id}`}><strong className="blogTitle">{blog.title}</strong></Link> by {blog.author}</ListItemText>
      </ListItem>
      <Divider />
    </>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired
};

export default Blog;
