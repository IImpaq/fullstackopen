const initialState = {
  neutral: 0,
  good: 0,
  bad: 0
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  switch(action.type) {
  case "NEUTRAL":
    return { ...state, neutral: state.neutral + 1 };
  case "GOOD":
    return { ...state, good: state.good + 1 };
  case "BAD":
    return { ...state, bad: state.bad + 1 };
  case "RESET":
    return { neutral: 0, good: 0, bad: 0 };
  default:
    return state;
  }
};

export default counterReducer;
