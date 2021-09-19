import Toggleable from "../components/Toggleable";
import BlogForm from "../components/BlogForm";
import Blog from "../components/Blog";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteBlog, voteFor} from "../reducers/blogReducer";
import {notifyWith} from "../reducers/notificationReducer";
import {useHistory} from "react-router-dom";
import {
  Button,
  Divider,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";

const Blogs = ({ user, id }) => {
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  const history = useHistory();

  if (id !== null) {
    const blog = blogs.find(cur => cur.id === id);

    if (!blog) {
      return null;
    }

    const visibleForCreator = { display: user.username === blog.user.username
      ? ""
      : "none" };

    const handleLike = (event) => {
      event.preventDefault();
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
        try {
          dispatch(deleteBlog(blog.id));
          dispatch(notifyWith("Deleted blog", 5, false));
          history.push("/");
        } catch(error) {
          console.error(error);
          dispatch(notifyWith("Failed deleting blog", 5, true));
        }
      }
    };

    return (
      <div>
        <Typography variant="h5">{blog.title} by {blog.author}</Typography>
        <List>
          <Divider />
          <ListItem>
            <ListItemText><Link href={blog.url} target="_blank" rel="noreferrer">{blog.url}</Link></ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>likes: {blog.likes}</ListItemText>
            <Button
              variant="contained"
              color="primary"
              onClick={handleLike}
              className="buttonLike">
              like
            </Button>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText>posted by {blog.user.name}</ListItemText>
          </ListItem>
          <Divider />
          <ListItem>
            <Button
              variant="contained"
              color="secondary"
              style={visibleForCreator}
              onClick={handleDelete}
              className="buttonDelete">
              delete
            </Button>
          </ListItem>
        </List>

      </div>
    );
  }

  return (
    <div>
      <Toggleable openText="create new blog" closeText="cancel">
        <BlogForm />
      </Toggleable>
      <p/>
      <List>
        <Divider />
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id}
            blog={blog} />
        )}
      </List>
    </div>
  );
};

export default Blogs;