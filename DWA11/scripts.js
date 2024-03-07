import { createStore } from "./store.js";
import { reducer } from "./reducers.js";
import { actions } from "./actions.js";

const store = createStore(reducer);

console.log("Initial state: ", store.getState().count); // Expected output: 0

const unsubscribe1 = store.subscribe(() => {
  console.log("State after ADD action: ", store.getState().count);
});

store.dispatch(actions.ADD);
store.dispatch(actions.ADD); // Expected output: 2
unsubscribe1(); // Unsubscribe after the scenario

store.dispatch(actions.SUBTRACT); // Expected output: 1

store.dispatch(actions.RESET); // Expected output: 0
