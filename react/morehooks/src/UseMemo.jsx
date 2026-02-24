import React, { useState, useMemo, useCallback } from "react";
import Child from "./components/Child";

const UseMemo = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const handleClick = () => {
    setCount1(count1 + 1);
  };

  const handleClick2 = () => {
    setCount2(count2 + 1);
  };

  function sum() {
    console.log("heavy function called again");
    let sum = 0;
    for (let i = 0; i < 1000000000; i++) {
      sum = sum + i;
    }
    return sum;
  }

  function sayHi() {
    console.log("hi");
  }

  const res = useCallback(() => sayHi, []);
  //   const res = sayHi();
  // const result = sum();
  const result = useMemo(() => sum(), []);
  return (
    <div>
      <h2>the value heavy duty function is:{result}</h2>
      <h1>count1:{count1}</h1>
      <button onClick={handleClick}>Increse for parent</button>

      <br></br>

      <br></br>
      <h1>Count in child:{count2}</h1>

      <button onClick={handleClick2}>Increase for child</button>
      <br></br>
      <Child sayHi={res} />
    </div>
  );
};

export default UseMemo;
