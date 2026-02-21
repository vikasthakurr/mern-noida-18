import React from "react";
// Importing the Hooks we need from the React library
import { useState, useEffect } from "react";

const App = () => {
  // ==========================================
  // 1. useState Hook
  // ==========================================
  // - Allows us to add state variables to functional components.
  // - 'count' is our state variable, initially set to 0.
  // - 'setCount' is the function we use to update 'count'.
  // - Whenever 'setCount' is called, React re-renders the component to show the new value.
  const [count, setCount] = useState(0);

  // ==========================================
  // 2. useEffect Hook
  // ==========================================
  // - Lets us perform "side effects" (e.g., fetching data, timers, manual DOM changes).
  // - The function inside runs after the component renders.
  // - The empty array `[]` is the dependency array:
  //   * If `[]` is empty, this effect runs ONLY ONCE when the component first mounts.
  //   * If omitted, it runs after EVERY render.
  //   * If it has variables, like `[count]`, it runs when those variables change.
  useEffect(() => {
    console.log("i am a costly api");
  }, []);

  // ==========================================
  // WHY REGULAR VARIABLES DON'T WORK FOR UI
  // ==========================================
  // let count = 0;
  // const handleClick = () => {
  //   // eslint-disable-next-line react-hooks/immutability
  //   // If we just change a regular variable, React doesn't know it changed.
  //   // The value updates in memory, but the UI will NOT re-render to show it.
  //   count = count + 1;
  //   console.log(count);
  // };

  const handleClick = () => {
    // We must use the state setter function to update the state.
    // This tells React to re-render the component with the new state.
    setCount(count + 1);

    // Note: State updates are asynchronous in React.
    // This console.log will print the OLD value of count right after calling setCount.
    console.log(count);
  };

  return (
    <div>
      {/* 
        In JSX, we use curly braces {} to evaluate JavaScript expressions and variables.
        Here we are displaying the current state value of 'count'. 
      */}
      <h1>the value of count it:{count}</h1>

      {/* 
        We pass the function reference 'handleClick' to the onClick event listener.
        React will call this function whenever the button is clicked.
      */}
      <button onClick={handleClick}>Change</button>
    </div>
  );
};

export default App;
