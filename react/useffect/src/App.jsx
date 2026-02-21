import React, { useState, useEffect } from "react";

const App = () => {
  // ==========================================
  // React useEffect Hook Notes
  // ==========================================
  // The useEffect Hook allows you to perform side effects in your components.
  // Some examples of side effects are: fetching data, setting up subscriptions, and timers.
  //
  // Syntax: useEffect(<function>, <dependency array>)
  //
  // 1. No dependency array:
  //    useEffect(() => { ... })
  //    Runs on every render (initial render and every subsequent re-render).
  //
  // 2. An empty dependency array []:
  //    useEffect(() => { ... }, [])
  //    Runs ONCE after the initial render.
  //
  // 3. Props or state in the dependency array:
  //    useEffect(() => { ... }, [prop, state])
  //    Runs on initial render and re-runs whenever any dependency value changes.
  //
  // Cleanup Function:
  //    If your side effect creates resources (like a timer or subscription) that need to be cleaned up,
  //    your effect function can return a cleanup function. React runs this cleanup function before
  //    the component unmounts, and before re-running the effect on subsequent renders.
  // ==========================================

  const [count, setCount] = useState(0);

  // Example 1: Runs only on the first render (component mounting)
  useEffect(() => {
    console.log("1. Component mounted! (Runs only once)");

    // Optional Cleanup function
    return () => {
      console.log("Component unmounting... Cleanup happens here.");
    };
  }, []); // Empty dependency array

  // Example 2: Runs on initial render and whenever the 'count' state changes
  useEffect(() => {
    console.log(`2. The count state changed to: ${count}`);
  }, [count]); // Dependency array with 'count'

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Understanding useEffect</h1>
      <p>
        Please open your browser's Developer Tools (Console) to see the effects
        in action.
      </p>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      >
        <h3>Counter Example</h3>
        <p>
          Current Count: <strong>{count}</strong>
        </p>
        <button
          onClick={() => setCount(count + 1)}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          Increment Count
        </button>
      </div>
    </div>
  );
};

export default App;
