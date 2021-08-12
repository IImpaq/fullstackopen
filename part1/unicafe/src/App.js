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

const StatisticLine = ({text, value}) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
}

const Statistics = ({good, neutral, bad}) => {
  const title = "statistics"
  const total = good + neutral + bad;

  if (total === 0) {
    return (
      <>
        <h1>{title}</h1>
        <p>No feedback given</p>
      </>
    );
  }

  const average = (good - bad) / total;
  const positive = good / total * 100;

  return (
    <>
      <h1>{title}</h1>
      <table>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + "%"} />
      </table>
    </>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const addGood = () => () => setGood(good + 1);
  const addNeutral= () => () => setNeutral(neutral + 1);
  const addBad = () => () => setBad(bad + 1);

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
