// ==========================================
// 1. WHAT IS REACT?
// ==========================================
// React is a declarative, efficient, and flexible JavaScript library for building user interfaces.
// It lets you compose complex UIs from small and isolated pieces of code called "components".
// Instead of manipulating the DOM manually, you describe what you want to see (declarative),
// and React updates the DOM efficiently when your data changes.
import React from "react";

// ==========================================
// 2. COMPONENTS
// ==========================================
// Components are the building blocks of any React application.
// Think of them like custom HTML elements or JavaScript functions that return UI elements (JSX).
// They help you break your UI down into independent, reusable pieces.
// Here we are importing two child components: Navbar and Home.
import Home from "./components/Home";
import Navbar from "./components/Navbar";

// ==========================================
// 3. COMPONENT DEFINITION (DESIGNATION)
// ==========================================
// This is the 'App' component, which is typically the root or parent component of a React app.
// It is a "Functional Component", defined using an arrow function.
const App = () => {
  console.log("hi");

  // The 'return' statement specifies what this component should render on the screen.
  // It returns JSX (JavaScript XML), which allows us to write HTML-like syntax inside JS.
  return (
    // ==========================================
    // 4. FRAGMENTS (<> ... </>)
    // ==========================================
    // In React, a component can only return ONE single parent element.
    // If we want to return multiple elements side-by-side (like Navbar and Home),
    // we wrap them in a "Fragment" (the empty tags <></>).
    // This allows us to group multiple elements without adding an extra div wrapper to the DOM.
    <>
      <Navbar />
      <Home />
    </>
  );
};

// Exporting the component so it can be imported and used in other files (like index.js).
export default App;
