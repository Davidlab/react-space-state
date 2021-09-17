import { createStore } from "./react-space-state";

const [useStore, initStore] = createStore();

export const configureCounterStore = () => {
  const actions = {
    ADD: (state, amount) => ({ counter: state.counter + amount }),
    SUB: (state, amount) => ({ counter: state.counter - amount })
  };

  initStore(actions, { counter: 0 });
};

// export { useStore as useCounterStore };
export { useStore };
