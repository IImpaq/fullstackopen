import React, {useEffect, useState} from "react"
import {useQuery} from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    if(result.data) {
      setAllBooks(result.data.allBooks);
      let tempGenres = ["All genres"];
      result.data.allBooks.forEach((book) => {
        book.genres.forEach((genre) => {
          if(!tempGenres.includes(genre)) {
            tempGenres.push(genre);
          }
        });
      });
      setGenres(tempGenres);
      setSelectedGenre(tempGenres[0]);
    }
  }, [result]);

  useEffect(() => {
    if(selectedGenre === genres[0]) {
      setFilteredBooks(allBooks);
    } else {
      setFilteredBooks(
        allBooks.filter(book => book.genres.includes(selectedGenre))
      );
    }
  }, [allBooks, selectedGenre]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>

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
      <div>
        {
          genres.length > 0 &&
            genres.map(genre => (
              <button onClick={() => setSelectedGenre(genre)} key={genre}>
                {genre}
              </button>
            ))
        }
      </div>
    </div>
  );
};

export default Books;