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

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  const average = (good - bad) / total;
  const positive = good / total * 100;

  return (
    <>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {average}</p>
      <p>positive {positive}%</p>
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
