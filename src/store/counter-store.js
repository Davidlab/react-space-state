import { createStore } from "./react-space-state";

export const store = createStore();

export const configureCounterStore = () => {
  const actions = {
    ADD: (state, amount) => ({ counter: state.counter + amount }),
    SUB: (state, amount) => ({ counter: state.counter - amount })
  };

  store.initStore(actions, { counter: 0 });
};
