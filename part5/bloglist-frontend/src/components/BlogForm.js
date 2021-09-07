import React, { useState } from "react";

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState("");
  const [blogAuthor, setBlogAuthor] = useState("");
  const [blogURL, setBlogURL] = useState("");

  const handleBlogCreation = (event) => {
    event.preventDefault();
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogURL
    });
    setBlogTitle("");
    setBlogAuthor("");
    setBlogURL("");
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

export default BlogForm;
