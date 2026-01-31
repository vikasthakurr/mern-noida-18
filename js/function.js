/*
=============================================================================
                    JAVASCRIPT FUNCTIONS
=============================================================================

WHAT ARE FUNCTIONS?
- Functions are reusable blocks of code designed to perform a specific task
- They help organize code, avoid repetition (DRY principle), and improve readability
- Functions can accept inputs (parameters) and return outputs (return values)
- They are "first-class citizens" in JavaScript - can be assigned to variables,
  passed as arguments, and returned from other functions

WHY USE FUNCTIONS?
- Code Reusability: Write once, use multiple times
- Modularity: Break complex problems into smaller, manageable pieces
- Maintainability: Easier to update and debug
- Abstraction: Hide complex logic behind simple function calls
- Organization: Keep code clean and structured

=============================================================================
1. NAMED FUNCTION (FUNCTION DECLARATION)
=============================================================================

SYNTAX:
  function functionName(parameters) {
    // code to execute
    return value;
  }

KEY POINTS:
- Declared using the 'function' keyword followed by a name
- Hoisted to the top of their scope (can be called before declaration)
- Must have a name
- Can be called anywhere in the scope
- Creates a function with its own 'this' context

EXAMPLE:
  function greet(name) {
    return "Hello, " + name;
  }
  greet("John"); // "Hello, John"

=============================================================================
2. ANONYMOUS FUNCTION (FUNCTION EXPRESSION)
=============================================================================

SYNTAX:
  let variableName = function(parameters) {
    // code to execute
    return value;
  };

KEY POINTS:
- Function without a name, assigned to a variable
- NOT hoisted (cannot be called before assignment)
- Must be assigned to a variable or used immediately
- Useful for callbacks and one-time use functions
- Creates its own 'this' context

EXAMPLE:
  let greet = function(name) {
    return "Hello, " + name;
  };
  greet("Jane"); // "Hello, Jane"

=============================================================================
3. ARROW FUNCTION (ES6)
=============================================================================

SYNTAX:
  // Single parameter, single expression
  const functionName = param => expression;
  
  // Multiple parameters
  const functionName = (param1, param2) => expression;
  
  // Multiple statements
  const functionName = (params) => {
    // statements
    return value;
  };

KEY POINTS:
- Shorter, more concise syntax introduced in ES6
- Does NOT have its own 'this' - inherits 'this' from parent scope (lexical binding)
- Cannot be used as constructors
- Implicit return for single expressions (no 'return' keyword needed)
- Always anonymous (assigned to variables/constants)

IMPLICIT RETURN:
  const add = (a, b) => a + b;  // Automatically returns a + b
  
EXPLICIT RETURN:
  const add = (a, b) => {
    return a + b;  // Need 'return' keyword with curly braces
  };

WHEN TO USE:
- Callbacks, array methods (map, filter, reduce)
- When you want to preserve 'this' from outer scope
- For short, simple functions

=============================================================================
4. IIFE (IMMEDIATELY INVOKED FUNCTION EXPRESSION)
=============================================================================

SYNTAX:
  // Anonymous IIFE
  (function() {
    // code
  })();
  
  // Named IIFE
  (function functionName() {
    // code
  })();
  
  // Arrow IIFE
  (() => {
    // code
  })();

KEY POINTS:
- Function that runs immediately after it's defined
- Wrapped in parentheses to make it an expression
- Followed by () to invoke it immediately
- Creates a private scope (variables inside don't pollute global scope)
- Used for module patterns and avoiding global scope pollution

WHY USE IIFE?
- Data Privacy: Variables inside are not accessible from outside
- Avoid global namespace pollution
- Execute code immediately without leaving traces
- Common in older code before ES6 modules

EXAMPLE:
  (function() {
    let message = "This is private";
    console.log(message);  // Works
  })();
  console.log(message);  // Error: message is not defined

=============================================================================
5. CALLBACK FUNCTION
=============================================================================

DEFINITION:
- A function passed as an argument to another function
- Called/executed inside the other function
- Used heavily in asynchronous programming (events, setTimeout, API calls)

EXAMPLE:
  function processData(callback) {
    let data = "Processed";
    callback(data);  // Calling the callback function
  }
  
  processData(function(result) {
    console.log(result);  // "Processed"
  });

COMMON USES:
- Event handlers: addEventListener('click', callback)
- Array methods: array.map(callback)
- Asynchronous operations: setTimeout(callback, 1000)

=============================================================================
6. HIGHER-ORDER FUNCTION
=============================================================================

DEFINITION:
- A function that takes another function as an argument, OR
- A function that returns a function

EXAMPLE 1 (Takes function as argument):
  function calculate(operation, a, b) {
    return operation(a, b);
  }
  
  let result = calculate((x, y) => x + y, 5, 3);  // 8

EXAMPLE 2 (Returns a function):
  function multiplier(factor) {
    return function(number) {
      return number * factor;
    };
  }
  
  let double = multiplier(2);
  double(5);  // 10

BUILT-IN HIGHER-ORDER FUNCTIONS:
- Array.map(), Array.filter(), Array.reduce()
- setTimeout(), setInterval()
- addEventListener()

=============================================================================
FUNCTION PARAMETERS vs ARGUMENTS
=============================================================================

PARAMETERS:
- Variables listed in the function definition
- Placeholders for values

ARGUMENTS:
- Actual values passed to the function when called
- Replace the parameters

EXAMPLE:
  function greet(name, age) {  // 'name' and 'age' are parameters
    console.log(name + " is " + age);
  }
  
  greet("John", 25);  // "John" and 25 are arguments

DEFAULT PARAMETERS (ES6):
  function greet(name = "Guest") {  // Default value if not provided
    return "Hello, " + name;
  }
  greet();  // "Hello, Guest"
  greet("John");  // "Hello, John"

REST PARAMETERS (ES6):
  function sum(...numbers) {  // Collects all arguments into an array
    return numbers.reduce((total, num) => total + num, 0);
  }
  sum(1, 2, 3, 4);  // 10

=============================================================================
RETURN STATEMENT
=============================================================================

- Returns a value from the function to the caller
- Stops function execution immediately
- Functions without 'return' return 'undefined' by default

EXAMPLE:
  function add(a, b) {
    return a + b;  // Returns the sum
    console.log("This won't execute");  // Never runs
  }
  
  let result = add(3, 5);  // result = 8

=============================================================================
COMPARISON: WHEN TO USE EACH TYPE
=============================================================================

NAMED FUNCTION:
✓ Need hoisting (call before declaration)
✓ Recursive functions (function calls itself)
✓ Clear function name improves readability

ANONYMOUS FUNCTION:
✓ One-time use (callbacks)
✓ Function expressions assigned to variables
✓ Don't need hoisting

ARROW FUNCTION:
✓ Short, concise syntax needed
✓ Need to preserve 'this' from outer scope
✓ Array methods (map, filter, reduce)
✗ DON'T use for methods, constructors, or when you need 'arguments' object

IIFE:
✓ Need private scope immediately
✓ Avoid global scope pollution
✓ Execute initialization code once

=============================================================================
*/

// =============================================================================
// EXAMPLE 1: NAMED FUNCTION (FUNCTION DECLARATION)
// =============================================================================
// A simple named function that can be called anywhere in the scope due to hoisting
// function abc() {}
// abc();  // Calling/invoking the function - executes the code inside abc()

// =============================================================================
// EXAMPLE 2: ANONYMOUS FUNCTION (FUNCTION EXPRESSION)
// =============================================================================
// Function without a name, assigned to a variable 'res'
// Cannot be called before this line (no hoisting)
// let res = function () {
//   // Function body - code to execute
// };
// res();  // Call it like this
// =============================================================================
// EXAMPLE 3: FUNCTION WITH RETURN STATEMENT
// =============================================================================
// Named function that returns a value
// function hello() {
//   return "hi";  // Returns the string "hi" to the caller
// }
// let result = hello();  // result will be "hi"

// =============================================================================
// EXAMPLE 4: ARROW FUNCTION (ES6)
// =============================================================================
// Modern, concise syntax using arrow (=>) notation
// Single expression - implicit return (no curly braces or 'return' keyword needed)
// const hello = (props) => console.log("hi");
// hello();  // Calling the arrow function

// Arrow function variations:
// const add = (a, b) => a + b;  // Implicit return
// const greet = name => `Hello ${name}`;  // Single param, no parentheses needed
// const multi = (a, b) => {  // Multiple statements need curly braces
//   let result = a * b;
//   return result;  // Explicit return needed with {}
// };

// =============================================================================
// EXAMPLE 5: IIFE (IMMEDIATELY INVOKED FUNCTION EXPRESSION)
// =============================================================================

// Named IIFE - function with a name that executes immediately
// (function abc() {
//   console.log("hi");  // This runs immediately when the script loads
// })();
// Syntax breakdown:
//   1. (function abc() {...})  - Wrap function in parentheses to make it an expression
//   2. ()  - Invoke/call it immediately
// Variables inside are private and don't pollute global scope

// Anonymous IIFE - more common pattern
// (function () {
//   console.log("hi1");  // Runs immediately, no function name needed
// })();

// Another anonymous IIFE example
// (function(){
//     console.log("hello")  // Executes right away
// })();

// Arrow Function IIFE (ES6 style)
// (() => {
//   console.log("Modern IIFE with arrow function");
// })();

// IIFE with parameters
// (function(name) {
//   console.log("Hello, " + name);
// })("World");  // Pass "World" as argument

// Why use IIFE?
// - Execute code immediately without leaving a named function
// - Create private scope for variables
// - Avoid polluting global namespace
// - Common pattern before ES6 modules
