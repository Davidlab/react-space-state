//React Space State vs 0.1 - React state management (redux replacement)
/* eslint-disable */

//React Space State vs 0.1 - React state management (redux replacement)
/* eslint-disable */

import { useState, useEffect } from "react";

const Store = (globalState, listeners, actions) => {
  const useStore = (shouldListen = true, needsRender = () => true) => {
    const setState = useState(globalState)[1];

    // const prevState = useRef( this.globalState )
    // const prevState = globalState;

    const dispatch = (actionIdentifier, payload) => {
      const prevState = globalState; //useRef causes error -Hook inside func component
      const newState = actions[actionIdentifier](globalState, payload);
      globalState = { ...globalState, ...newState };

      for (const listener of listeners) {
        if (listener.needsRender(globalState, prevState)) {
          listener.setState(globalState);
        }
      }
    };

    useEffect(() => {
      if (shouldListen) {
        listeners.push({ setState, needsRender });
      }

      return () => {
        if (shouldListen) {
          listeners = listeners.filter((li) => li.setState !== setState);
        }
      };
    }, [setState, shouldListen, needsRender]);

    return { getState: globalState, dispatch };
  };

  /**
   * Init the store
   *
   * @param userActions
   * @param initialState
   * @property initStore
   */
  const initStore = (userActions, initialState) => {
    if (initialState) {
      globalState = { ...globalState, ...initialState };
    }
    actions = { ...actions, ...userActions };
  };

  /**
   * Gets and returns the current global- state
   *
   * This will always rerender on state changes unless perimeter (needsRender) condition returns false-
   *
   * WARNING: Can not be called inside another react hook or function.(ex. useEffect)
   *
   * Use case: const- state = [storeObj].getState.
   * *state variable can now be used anywhere in- the component
   *
   *
   * @param needsRender - bol or func retrun bol
   * @property getState
   */
  const getState = (needsRender = () => true) => {
    let render =
      typeof needsRender === "function" ? needsRender : () => needsRender;
    return useStore(true, render).getState;
  };

  /**
   * Dispatch
   *
   * Used to extract the dispatch method from the store
   * Can not be called inside another react hook or function, but once extracted dispatch method
   * can then be used anywhere within the react component.
   *
   * Use case: const- dispatch = [storeObj].useDispatch.
   * *dispatch variable can now be used anywhere in- the component
   *
   * @param shouldListen - boolean
   * @property useDispatch
   */
  const useDispatch = (shouldListen = false) => {
    const { dispatch } = useStore(shouldListen);
    return dispatch;
  };

  /**
   * SpaceState component **experimental**
   *
   * Can be used as- a parent wrap or independent
   *
   * @param props
   * @return {null|*}
   * @property SpaceState
   */
  const SpaceState = (props) => {
    const dispatch = useDispatch();

    const dispatchEvent = function (evtObj) {
      dispatch(evtObj.detail.action, evtObj.detail.payload);
    };

    useEffect(() => {
      console.log("SpaceState mounted");

      window.addEventListener("spaceStateEvent", dispatchEvent, false);

      return () => {
        console.log("SpaceState unmounted");
        window.removeEventListener("spaceStateEvent", dispatchEvent, false);
      };
    });
    return undefined === props.children ? null : props.children;
  };

  /**
   * Dispatch eventListener **experimental**
   *
   * Used to create and dispatch a event listener to trigger a react dispatch action
   *
   * @param action
   * @param payload
   * @property dispatchStoreEvent
   */
  const dispatchStoreEvent = (action, payload = {}) => {
    const obj = { action, payload };
    const evt = new CustomEvent("spaceStateEvent", { detail: obj });
    window.dispatchEvent(evt);
  };

  return {
    initStore,
    useStore, //Main hook to store
    getState,
    useDispatch,
    dispatchStoreEvent, //creates a custom event listener
    SpaceState
  };
};

//Create SpaceState class
//Calling store as a property value prevents (hooks inside component error waring on some ides)
//This also allows separate stores to be created within the same app

/**
 * @class SpaceState
 */
class SpaceState {
  constructor() {
    this.globalState = {};
    this.listeners = [];
    this.actions = {};
    this.store = Store(this.globalState, this.listeners, this.actions);
  }
}

/**
 *
 * @return {
 * {getState: (function(*=): *),
 * useDispatch: (function(*=): dispatch),
 * SpaceState: (function(*): null|*), initStore: initStore,
 * dispatchStoreEvent: dispatchStoreEvent,
 * useStore: (function(*=, *=): {globalState: *,
 * dispatch: function(*, *=): void})}
 * }
 *
 * @property createStore
 */
export const createStore = () => {
  return new SpaceState().store;
};
