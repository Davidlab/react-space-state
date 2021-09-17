import { useState, useEffect } from "react";

const Store = (globalState, listeners, actions) => {
  const useStore = (shouldListen = true, shouldSubscribe = () => true) => {
    const setState = useState(globalState)[1];

    // const prevState = useRef( this.globalState )
    const prevState = globalState;

    const dispatch = (actionIdentifier, payload) => {
      const newState = actions[actionIdentifier](globalState, payload);
      globalState = { ...globalState, ...newState };

      for (const listener of listeners) {
        if (listener.shouldSubscribe(newState, prevState)) {
          listener.setState(globalState);
        }
      }
    };

    useEffect(() => {
      if (shouldListen) {
        listeners.push({ setState, shouldSubscribe });
      }

      return () => {
        if (shouldListen) {
          listeners = listeners.filter((li) => li.setState !== setState);
        }
      };
    }, [setState, shouldListen, shouldSubscribe]);

    return [globalState, dispatch];
  };

  const initStore = (userActions, initialState) => {
    if (initialState) {
      globalState = { ...globalState, ...initialState };
    }
    actions = { ...actions, ...userActions };
  };

  return [useStore, initStore];
};

class SpaceState {
  constructor() {
    this.globalState = {};
    this.listeners = [];
    this.actions = {};
    this.store = Store(this.globalState, this.listeners, this.actions);
  }
}

// export const createStore = new SpaceState().store;

export const createStore = () => {
  return new SpaceState().store;
};
