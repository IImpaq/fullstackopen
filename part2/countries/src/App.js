import React, {useState, useEffect} from "react"
import axios from "axios"
import Filter from "./components/Filter"
import CountryList from "./components/CountryList"

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data);
      })
      .catch(error => {
        console.log(error);
      }); 
  }, []);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <Filter value={filter} handleChange={handleFilter} />
      <CountryList countries={countries} filter={filter} />
    </div>
  );
};

export default App;