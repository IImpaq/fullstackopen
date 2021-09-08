import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("unicafe reducer", () => {
  const initialState = {
    neutral: 0,
    good: 0,
    bad: 0
  };

  test("should return valid state when called with undefined action", () => {
    const action = {
      type: "DO_NOTHING"
    };
    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });
  test("good does increment", () => {
    const state = initialState;
    const action = {
      type: "GOOD"
    };
    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ ...initialState, good: 1 });
  });
  test("neutral does increment", () => {
    const state = initialState;
    const action = {
      type: "NEUTRAL"
    };
    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ ...initialState, neutral: 1 });
  });
  test("bad does increment", () => {
    const state = initialState;
    const action = {
      type: "BAD"
    };
    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({ ...initialState, bad: 1 });
  });
});