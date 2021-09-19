import blogServices from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case "INIT_BLOGS":
    return action.data;
  case "CREATE_BLOG":
    return [ ...state, action.data ];
  case "LIKE":
  {
    const id = action.data.id;
    return state.map(blog =>
      blog.id === id ? action.data : blog
    );
  }
  case "DELETE_BLOG":
    return state.filter(blog => blog.id !== action.data);
  default:
    return state;
  }
};

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogServices.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs
    });
  };
};

export const createBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogServices.create(blog);
    dispatch({
      type: "CREATE_BLOG",
      data: newBlog
    });
  };
};

export const voteFor = (blog) => {
  return async dispatch => {
    const newBlog = await blogServices.update(blog.id, {
      ...blog,
      likes: blog.likes + 1
    });
    dispatch({
      type: "LIKE",
      data: newBlog
    });
  };
};

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogServices.remove(id);
    dispatch({
      type: "DELETE_BLOG",
      data: id
    });
  };
};

export default blogReducer;