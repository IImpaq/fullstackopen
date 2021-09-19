import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../reducers/usersReducer";
import {Link} from "react-router-dom";
import {
  Paper,
  Table, TableBody, TableContainer,
  TableCell,
  TableHead, TableRow,
  Typography, List, ListItem, ListItemText, Divider
} from "@material-ui/core";

const Users = ({ id }) => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if(id !== null) {
    const user = users.find(cur => cur.id === id );

    if (!user) {
      return null;
    }

    return (
      <div>
        <Typography variant="h5" style={{paddingBottom: "1rem"}}>{user.name}</Typography>
        <Typography variant="h6">added blogs:</Typography>
        <List>
          <Divider />
          {user.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <div key={blog.id}>
              <ListItem >
                <ListItemText>{blog.title}</ListItemText>
              </ListItem>
              <Divider />
            </div>
          )}
        </List>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h5" style={{paddingBottom: "1rem"}}>Users</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="right">blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.sort((a, b) => b.blogs.length - a.blogs.length).map(user =>
              <TableRow key={user.id}>
                <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                <TableCell align="right">{user.blogs.length}</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;