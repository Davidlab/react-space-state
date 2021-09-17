import React, { useEffect } from "react";

import { useStore } from "../store/counter-store";
import "./Counter.css";
const Count = (props) => {
  const state = useStore()[0];

  useEffect(() => {
    // console.log("count.js");
  }, []);

  return (
    <div className="counter">
      <h3>Total Count:</h3>
      <p>{state.counter}</p>
    </div>
  );
};

export default Count;
