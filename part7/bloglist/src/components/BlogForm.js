import React, { useState } from "react";
import { connect, useSelector } from "react-redux";
import { notifyWith } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = (props) => {
  const user = useSelector(state => state.user);
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogURL, setBlogURL] = useState("");

  const handleBlogCreation = (event) => {
    event.preventDefault();
    try {
      props.createBlog({
        title: blogTitle,
        author: blogAuthor,
        url: blogURL
      }, user);
      props.notifyWith(`Created new blog: ${blogTitle} by ${blogAuthor}`, 5, false);
      setBlogTitle("");
      setBlogAuthor("");
      setBlogURL("");
    } catch(error) {
      props.notifyWith("Failed creating a new blog", 5, true);
      console.error(error);
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          title: <input value={blogTitle} name="blogTitle" id="inputTitle"
            onChange={({target}) =>
              setBlogTitle(target.value)
            } />
        </div>
        <div>
          author: <input value={blogAuthor} name="blogAuthor" id="inputAuthor"
            onChange={({target}) =>
              setBlogAuthor(target.value)
            } />
        </div>
        <div>
          url: <input value={blogURL} name="blogURL" id="inputURL"
            onChange={({target}) =>
              setBlogURL(target.value)
            } />
        </div>
        <button type="submit" id="buttonCreate">create</button>
      </form>
    </>
  );
};

const mapDispatchToProps = {
  notifyWith,
  createBlog
};

const ConnectedBlogForm = connect(null, mapDispatchToProps)(BlogForm);
export default ConnectedBlogForm;
