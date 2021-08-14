import React,{useState,useEffect} from "react"
import axios from "axios"

const Details = ({country}) => {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    axios
      .get(`http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`)
      .then(response => {
        console.log(response.data);
        setWeather(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  }, [country.capital]);

  const renderWeather = () => {
    if(weather === [] || weather.main === undefined)
      return <></>

    return <>
      <h2>weather in {country.capital}</h2>
      <p>
        <strong>temperature: </strong>{weather.main.temp}°C<br/>
        <strong>wind: </strong>{weather.wind.speed} m/s {weather.wind.deg}°<br/>
        <strong>weather data provided by <a href="https://www.openweathermap.org" 
                                            target="_blank" 
                                            rel="noreferrer noopener">openweathermap</a>
        </strong>
      </p>
    </>
  };

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
      {renderWeather()}
    </>
  );
}

export default Details;