import React from "react"
import Country from "./Country"
import Details from "./Details"

const CountryList = ({countries, filter}) => {
  const filteredCountries = 
    filter === "" 
      ? countries 
      : countries.filter(
          country => country.name.toLowerCase().includes(filter.toLowerCase()));

  if(filteredCountries.length === 1) {
    return <Details country={ filteredCountries[0]} />
  }

  if(filteredCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <div>
    {
      filteredCountries.map(country =>
        <Country key={country.numericCode} country={country} />
      )
    }
    </div>
  );
}

export default CountryList;