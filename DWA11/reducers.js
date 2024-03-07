import { actions } from "./actions.js";

export const reducer = (state = { count: 0 }, action) => {
  switch (action) {
    case "ADD":
      return { count: state.count + 1 };
    case "SUBTRACT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
};
