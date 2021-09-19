import blogServices from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch(action.type) {
  case "INIT_BLOGS":
    return action.data;
  case "CREATE_BLOG":
    return [ ...state, action.data ];
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

export default blogReducer;