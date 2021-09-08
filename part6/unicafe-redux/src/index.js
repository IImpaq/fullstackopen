import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import counterReducer from "./reducer";

const store = createStore(counterReducer);

const App = () => {
  const handleClick = (type) => {
    store.dispatch({
      type: type
    });
  };

  return (
    <div>
      <button onClick={() => handleClick("GOOD")}>good</button>
      <button onClick={() => handleClick("NEUTRAL")}>neutral</button>
      <button onClick={() => handleClick("BAD")}>bad</button>
      <button onClick={() => handleClick("RESET")}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>neutral {store.getState().neutral}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();

store.subscribe(renderApp);