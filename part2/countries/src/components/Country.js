import React, {useState} from "react"
import Details from "./Details"

const Country = ({country}) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
  }

  const renderDetails = () => {
    if(showDetails) {
      return <Details country={country} />
    }
  }

  return (
    <>
      <div>
        {country.name}
        <button onClick={handleClick}>
          {showDetails ? "hide" : "show"}
        </button>
      </div>
      {renderDetails()}
    </>      
  );
};

export default Country;