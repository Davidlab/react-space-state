import React from "react";

import { useStore } from "../store/counter-store";
import "./Counter.css";

//Example using subscribe to store
//class.useStore(boolean, function(newState, oldState) =>{return boolean. Return true to run, false not to run on dispatch call}
const CountSubscribe = (props) => {
  const state = useStore(true, (newState, oldState) => {
    //Will only run this state update with counter hits five
    // return newState.counter === 5;
    if (newState.counter % 2 === 0) {
      return true;
      console.log("Even");
    } else {
      return false;
      console.log("Odd");
    }
    //Note always return false if you don't want to subscribe
  })[0];

  return (
    <div className="counter">
      <h3>State subscribe example: Counter only updates on even numbers</h3>
      <p>{state.counter}</p>
    </div>
  );
};

export default CountSubscribe;
