import React from "react"

const CountryList = ({countries, filter}) => {
  const filteredCountries = 
    filter === "" 
      ? countries 
      : countries.filter(
          country => country.name.toLowerCase().includes(filter.toLowerCase()));

  if(filteredCountries.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    );
  }

  if(filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <div>
        <h1>{country.name}</h1>
        <p>
          capital: {country.capital}<br/>
          population: {country.population}
        </p>
        <h2>languages</h2>
        <ul>
           {
            country.languages.map(language =>
              <li key={language.iso639_2}>{language.name}</li>
            )
           }
        </ul>
        <img src={country.flag} width="100rem" alt="flag" />
      </div>
    );
  }

  return (
    <div>
    {
      filteredCountries.map(country =>
        <div key={country.numericCode}>{country.name}</div>
      )
    }
    </div>
  );
}

export default CountryList;