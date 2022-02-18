import React, {useEffect, useState} from "react";
import Select from "react-select";
import {useMutation, useQuery} from "@apollo/client";
import {ALL_AUTHORS, SET_BORN} from "../queries";

const Authors = ({show, isLoggedIn}) => {
  const result = useQuery(ALL_AUTHORS);
  const [options, setOptions] = useState([]);
  const [selectedName, setSelectedName] = useState(null);
  const [birthYear, setBirthYear] = useState("");

  const [ setBorn ] = useMutation(SET_BORN, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  useEffect(() => {
    if (result.data === undefined)
      return;

    let temp = [];
    for (let i = 0; i < result.data.allAuthors.length; ++i) {
      const author = result.data.allAuthors[i].name;
      temp = temp.concat({
        value: author,
        label: author
      })
    }
    setOptions(temp);
  }, [result]);

  if (!show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  const submit = async (event) => {
    event.preventDefault();

    setBorn({
      variables: { name: selectedName.value, setBornTo: +birthYear }
    });

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
      { isLoggedIn &&
      <form onSubmit={submit}>
        <div>
          name
          <Select
            defaultValue={selectedName}
            onChange={setSelectedName}
            options={options}
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
    }
    </div>
  );
};

export default Authors;
