import React, {useState} from "react";

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  );
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  );
};

const Statistics = (props) => {
  return (
    <>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
    </>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => () => {
    setGood(good + 1);
  }

  const addNeutral= () => () => {
    setNeutral(neutral + 1);
  }

  const addBad = () => () => {
    setBad(bad + 1);
  }

  return (
    <div>
      <Header title="give feedback" />
      <Button handleClick={addGood()} text="good" />
      <Button handleClick={addNeutral()} text="neutral" />
      <Button handleClick={addBad()} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
