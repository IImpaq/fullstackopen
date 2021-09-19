import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getUsers} from "../reducers/usersReducer";

const Users = () => {
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

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
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;