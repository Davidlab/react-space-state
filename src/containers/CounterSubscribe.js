import React from "react";

import { store } from "../store/counter-store";
import "./Counter.css";

//Example using subscribe to store
//class.useStore(boolean, function(newState, oldState) =>{return boolean. Return true to run, false not to run on dispatch call}
const CountSubscribe = (props) => {
  const state = store.getState((newState, oldState) => {
    //Will only run this state update with counter hits five
    // return newState.counter === 5;
    if (newState.counter % 2 === 0) {
      console.log("Even");
      return true;
    } else {
      console.log("Odd");
      return false;
    }
    //Note always return false if you don't want to subscribe
  });

  return (
    <div className="counter">
      <h3>State subscribe example: Counter only updates on even numbers</h3>
      <p>{state.counter}</p>
    </div>
  );
};

export default CountSubscribe;
