import React from "react";
import Card1 from "./Card1";

const App = () => {
  // ==========================================
  // VANILLA JS VS REACT EVENTS
  // ==========================================
  // In traditional Vanilla JavaScript, we often grab an element from the DOM
  // and attach an event listener to it like this:
  //
  // const btn = document.getElementById("btn");
  // console.log(btn);
  // btn.addEventListener("click", () => {
  //   console.log("btn clicked");
  //   // console.log(btn);
  // });
  //
  // However, in React, we DO NOT manipulate the DOM directly like this.
  // Instead, we use "Synthetic Events" directly on the JSX elements.

  // ==========================================
  // REACT EVENT HANDLERS
  // ==========================================
  // In React, we define functions to handle events.
  // Notice the camelCase naming convention for events in JSX (e.g., onClick instead of onclick).
  //
  // const handleClick = () => {
  //   console.log("btn clicked");
  // };

  return (
    <div>
      {/* 
        To attach an event in React, we pass the function reference (NOT the execution) 
        to the event attribute. 
        Example: onClick={handleClick} instead of onClick={handleClick()} 
      */}
      {/* <button onClick={handleClick}>Click</button> */}

      {/* ==========================================
          PROPS (PROPERTIES)
          ========================================== */}
      {/* 
        Props are arguments passed into React components.
        They are passed to components via HTML attributes.
        Here, we are passing 'fullname', 'age', and 'salry' as props to the Card1 component.
        Inside Card1, these will be accessible via a single 'props' object: 
        props.fullname, props.age, etc.
      */}
      <Card1 fullname="vikas" age="34" salry="12345" />

      {/* 
        Components are reusable! We can render multiple Card1 components
        with different props to display different data.
      */}
      {/* <Card1 fullname="akhilesh" />
      <Card1 fullname="akash" /> */}
    </div>
  );
};

export default App;
