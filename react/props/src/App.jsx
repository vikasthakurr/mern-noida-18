import React from "react";

// ==========================================
// 1. WHAT ARE PROPS? (Properties)
// ==========================================
// Props are arguments passed into React components.
// Think of them like HTML attributes (e.g., <img src="..." alt="..." />)
// or arguments passed to a JavaScript function.
// They are used to pass data from a parent component down to a child component.
// IMPORTANT: Props are READ-ONLY. A child component should never modify its own props.

// ==========================================
// 2. PASSING PROPS
// ==========================================
// To pass props, you add an attribute to the child component's JSX tag.
// For example: <Greeting name="John" age={25} isLoggedIn={true} />
// You can pass strings, numbers, booleans, arrays, objects, or even functions!

// ==========================================
// 3. RECEIVING PROPS
// ==========================================
// The child component receives the props as an object.
// You can access them via the 'props' argument in the function signature.
// Example: const Greeting = (props) => { return <h1>Hello, {props.name}</h1>; }
//
// Alternatively, you can Destructure the props directly in the signature:
// Example: const Greeting = ({ name, age }) => { return <h1>Hello, {name}</h1>; }

// Below is an example of passing props to a hypothetical ChildComponent
// (You would need to import ChildComponent first to actually render it)

const App = () => {
  return (
    <div>
      <h1>Props Explanation</h1>

      {/* Example 1: Passing a string prop */}
      {/* <ChildComponent message="Hello World!" /> */}

      {/* Example 2: Passing a number prop (requires curly braces) */}
      {/* <ChildComponent count={10} /> */}

      {/* Example 3: Passing multiple types of props */}
      {/* <UserProfile name="Alice" age={28} isPremium={true} /> */}
    </div>
  );
};

export default App;
