import React, {useEffect, useState} from "react"
import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import LoginForm from "./components/LoginForm";
import {useApolloClient} from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  useEffect(() => {
    const localToken = localStorage.getItem("library-user-token");
    if(localToken) {
      setToken(localToken);
    }
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {
          !token ? <button onClick={() => setPage("login")}>login</button>
              : <>
                <button onClick={() => setPage("add")}>add book</button>
                <button onClick={() => logout()}>logout</button>
                </>
        }
      </div>

      <Authors
        show={page === "authors"}
        isLoggedIn={token !== null}
      />

      <Books
        show={page === "books"}
      />

      <LoginForm
        show={page === "login"}
        setToken={setToken}
      />

      <NewBook
        show={page === "add"}
      />

    </div>
  );
};

export default App;