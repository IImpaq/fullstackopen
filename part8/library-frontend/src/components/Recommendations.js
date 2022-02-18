import React, {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {ALL_BOOKS, ME} from "../queries";

const Recommendations = (props) => {
  const result = useQuery(ALL_BOOKS);
  const user = useQuery(ME);
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [favoriteGenre, setFavoriteGenre] = useState("");

  useEffect(() => {
    if(result.data) {
      setAllBooks(result.data.allBooks);
      setFavoriteGenre(user.data.me.favoriteGenre);
    }
  }, [result]);

  useEffect(() => {
    setFilteredBooks(allBooks.filter(book => book.genres.includes(favoriteGenre)));
  }, [allBooks, favoriteGenre]);

  if(!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{favoriteGenre}</b></p>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>
            author
          </th>
          <th>
            published
          </th>
        </tr>
        {filteredBooks.map(a =>
          <tr key={a.title}>
            <td>{a.title}</td>
            <td>{a.author.name}</td>
            <td>{a.published}</td>
          </tr>
        )}
        </tbody>
      </table>
    </div>
  )
};

export default Recommendations;