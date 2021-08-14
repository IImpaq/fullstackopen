import React from "react"

const Details = ({country}) => {
  return (
    <>
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
    </>
  );
}

export default Details;