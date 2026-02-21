import React from "react";
import { useState, useEffect } from "react";

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("i am a costly api");
  },[]);
  // let count = 0;
  // const handleClick = () => {
  //   // eslint-disable-next-line react-hooks/immutability
  //   count = count + 1;
  //   console.log(count);
  // };
  const handleClick = () => {
    setCount(count + 1);
    console.log(count);
  };
  return (
    <div>
      <h1>the value of count it:{count}</h1>
      <button onClick={handleClick}>Change</button>
    </div>
  );
};

export default App;
