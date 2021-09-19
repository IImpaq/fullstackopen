import React, { useEffect } from "react";
import Notification from "./components/Notification";
import { initBlogs } from "./reducers/blogReducer";
import { reLogin} from "./reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import {Switch, Route, useRouteMatch} from "react-router-dom";
import Blogs from "./routes/Blogs";
import Users from "./routes/Users";
import Nav from "./components/Nav";
import Container from "@material-ui/core/Container";
import LoginForm from "./components/LoginForm";
import {Typography} from "@material-ui/core";

const App = () => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(reLogin());
  }, []);

  useEffect(() => {
    dispatch(initBlogs());
  }, [dispatch]);

  if(user === null) {
    return (
      <Container>
        <LoginForm/>
      </Container>
    );
  }

  const userMatch = useRouteMatch("/users/:id");
  const userId = userMatch ? userMatch.params.id : null;

  const blogMatch = useRouteMatch("/blogs/:id");
  const blogId = blogMatch ? blogMatch.params.id : null;

  return (
    <Container>
      <Nav user={user} />
      <Notification />
      <Typography variant="h4" style={{ padding: "1rem 0" }}>Blogs</Typography>
      <Switch>
        <Route path="/users/:id">
          <Users id={userId} />
        </Route>
        <Route path="/users">
          <Users id={userId} />
        </Route>
        <Route path="/blogs/:id">
          <Blogs user={user} id={blogId} />
        </Route>
        <Route path="/">
          <Blogs user={user} id={blogId} />
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
