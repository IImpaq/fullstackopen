import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../reducers/usersReducer";
import {Link} from "react-router-dom";

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
        <h2>{user.name}</h2>
        <h3>added blogs</h3>
        <ul>
          {user.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <li key={blog.id}>{blog.title}</li>
          )}
        </ul>
      </div>
    );
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th />
            <th>blogs created</th>
          </tr>
          {users.sort((a, b) => b.blogs.length - a.blogs.length).map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;