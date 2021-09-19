import Toggleable from "../components/Toggleable";
import BlogForm from "../components/BlogForm";
import Blog from "../components/Blog";
import React from "react";
import { useSelector } from "react-redux";

const Blogs = ({ user }) => {
  const blogs = useSelector(state => state.blogs);

  return (
    <div>
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

export default Blogs;