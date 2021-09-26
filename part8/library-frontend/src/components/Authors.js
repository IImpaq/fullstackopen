import React, {useState} from "react"
import {useMutation, useQuery} from "@apollo/client";
import {ALL_AUTHORS, SET_BORN} from "../queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const [ setBorn ] = useMutation(SET_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const submit = async (event) => {
    event.preventDefault();

    setBorn({
      variables: { name, setBornTo: +birthYear }
    });

    setName("");
    setBirthYear("");
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={birthYear}
            onChange={({ target }) => setBirthYear(+target.value)}
          />
        </div>
        <button type="submit">update author</button>
    </form>
    </div>
  );
};

export default Authors;
