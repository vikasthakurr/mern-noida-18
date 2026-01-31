/*
=============================================================================
                    JAVASCRIPT SCOPE
=============================================================================

WHAT IS SCOPE?
- Scope determines the accessibility/visibility of variables in different parts of code
- Scope defines where variables can be accessed or referenced
- Controls the lifetime of variables
- JavaScript uses lexical scoping (also called static scoping)

WHY IS SCOPE IMPORTANT?
- Prevents naming conflicts between variables
- Enables data privacy and encapsulation
- Manages memory efficiently
- Controls variable lifetime and accessibility
- Fundamental to understanding closures

=============================================================================
1. GLOBAL SCOPE
=============================================================================

DEFINITION:
- Variables declared outside any function or block
- Accessible from anywhere in the code
- Exist for the entire lifetime of the program
- Attached to the global object (window in browsers, global in Node.js)

KEY POINTS:
- Global variables can be accessed by any function or block
- Should be avoided when possible (can cause naming conflicts)
- var, let, and const in global scope all create global variables
- Functions declared globally are also in global scope

EXAMPLE:
  let globalVar = "I'm global";
  
  function test() {
    console.log(globalVar);  // Can access global variable
  }
  
  test();  // "I'm global"
  console.log(globalVar);  // "I'm global"

BEST PRACTICE:
- Minimize global variables to avoid:
  • Naming conflicts
  • Memory waste
  • Hard-to-debug code
  • Security vulnerabilities

=============================================================================
2. FUNCTION SCOPE (LOCAL SCOPE)
=============================================================================

DEFINITION:
- Variables declared inside a function
- Only accessible within that function
- Created when function is called, destroyed when function exits
- var, let, and const all create function-scoped variables when inside a function

KEY POINTS:
- Each function creates its own scope
- Variables inside function are NOT accessible from outside
- Function parameters are also function-scoped
- Inner functions can access variables from outer functions

EXAMPLE:
  function myFunction() {
    let localVar = "I'm local";
    console.log(localVar);  // Works
  }
  
  myFunction();
  console.log(localVar);  // Error: localVar is not defined

=============================================================================
3. BLOCK SCOPE (ES6)
=============================================================================

DEFINITION:
- Variables declared inside a block { } using let or const
- Only accessible within that block
- Introduced in ES6 with let and const
- Does NOT apply to var (var is function-scoped only)

KEY POINTS:
- Blocks are defined by curly braces: { }
- if, for, while, switch statements create blocks
- let and const are block-scoped
- var ignores block scope (function-scoped only)

EXAMPLE:
  {
    let blockVar = "I'm block-scoped";
    const blockConst = "Me too";
    var functionVar = "I'm function-scoped";
  }
  
  console.log(blockVar);      // Error: not defined
  console.log(blockConst);    // Error: not defined
  console.log(functionVar);   // Works! var ignores block scope

=============================================================================
4. LEXICAL SCOPE (STATIC SCOPE)
=============================================================================

DEFINITION:
- Scope is determined by where variables and functions are written in code
- Inner functions have access to variables in outer functions
- Also called "static scope" - determined at write time, not runtime
- JavaScript uses lexical scoping

KEY POINTS:
- Scope is determined by code structure, not call stack
- Child scope can access parent scope
- Parent scope CANNOT access child scope
- Scope lookup goes from inner to outer (scope chain)

EXAMPLE:
  function outer() {
    let outerVar = "outer";
    
    function inner() {
      let innerVar = "inner";
      console.log(outerVar);  // Can access outer's variable
      console.log(innerVar);  // Can access own variable
    }
    
    inner();
    console.log(innerVar);  // Error: can't access inner's variable
  }

=============================================================================
5. SCOPE CHAIN
=============================================================================

DEFINITION:
- The hierarchy of scopes from inner to outer
- When JavaScript looks for a variable, it searches:
  1. Current scope
  2. Parent scope
  3. Grandparent scope
  4. ... continues up to global scope

HOW IT WORKS:
  let global = "global";        // Global scope
  
  function outer() {
    let outerVar = "outer";     // Outer function scope
    
    function inner() {
      let innerVar = "inner";   // Inner function scope
      
      // Scope chain lookup:
      console.log(innerVar);    // Found in inner scope
      console.log(outerVar);    // Found in outer scope
      console.log(global);      // Found in global scope
    }
  }

SEARCH ORDER (innermost to outermost):
- inner scope → outer scope → global scope
- Stops at first match found
- Error if variable not found in any scope

=============================================================================
6. CLOSURE
=============================================================================

DEFINITION:
- A closure is when an inner function has access to outer function's variables
- Even after the outer function has finished executing
- The inner function "closes over" the outer function's variables
- One of JavaScript's most powerful features

HOW CLOSURES WORK:
- Inner function retains access to outer function's scope
- Outer function's variables stay alive even after function returns
- Creates private variables and data encapsulation

EXAMPLE:
  function outer() {
    let count = 0;  // Private variable
    
    function inner() {
      count++;  // Still has access to count
      console.log(count);
    }
    
    return inner;  // Return the inner function
  }
  
  let counter = outer();  // outer() executed and finished
  counter();  // 1 - but count still accessible!
  counter();  // 2 - count persists between calls
  counter();  // 3

WHY USE CLOSURES?
- Data privacy: Create private variables
- Factory functions: Generate functions with preset values
- Callbacks and event handlers
- Module pattern for encapsulation

REAL-WORLD USE CASES:
- Creating private state in objects
- Function factories
- Memoization and caching
- Event handlers that need access to outer variables

=============================================================================
VAR vs LET vs CONST (SCOPE PERSPECTIVE)
=============================================================================

VAR:
- Function-scoped (ignores block scope)
- Hoisted to top of function/global scope
- Can be redeclared
- Creates property on global object if declared globally

LET:
- Block-scoped { }
- Hoisted but not initialized (Temporal Dead Zone)
- Cannot be redeclared in same scope
- Preferred for variables that will change

CONST:
- Block-scoped { }
- Hoisted but not initialized (Temporal Dead Zone)
- Cannot be redeclared or reassigned
- Must be initialized at declaration
- Preferred for constants and values that won't change

COMPARISON:
  if (true) {
    var varVariable = "var";      // Function-scoped
    let letVariable = "let";      // Block-scoped
    const constVariable = "const"; // Block-scoped
  }
  
  console.log(varVariable);    // Works
  console.log(letVariable);    // Error
  console.log(constVariable);  // Error

BEST PRACTICE:
1. Use const by default
2. Use let when reassignment is needed
3. Avoid var (use let/const instead)

=============================================================================
COMMON SCOPE PITFALLS
=============================================================================

PITFALL 1: Accessing variable before declaration (with let/const)
  console.log(x);  // Error: Cannot access before initialization
  let x = 10;

PITFALL 2: var in loops
  for (var i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
  }
  // Prints: 3, 3, 3 (var is function-scoped, all share same i)
  
  // Fix with let:
  for (let i = 0; i < 3; i++) {
    setTimeout(() => console.log(i), 100);
  }
  // Prints: 0, 1, 2 (let creates new i for each iteration)

PITFALL 3: Unintentional global variables
  function test() {
    noKeyword = "oops";  // Without var/let/const, creates global!
  }
  test();
  console.log(noKeyword);  // "oops" - accidentally global!

=============================================================================
*/

// =============================================================================
// EXAMPLE 1: GLOBAL SCOPE
// =============================================================================
// Variable declared outside any function or block - accessible everywhere
// let a = 10; //global scope

// =============================================================================
// EXAMPLE 2: BLOCK SCOPE
// =============================================================================
// Variables declared with let/const inside { } are only accessible within that block
// {
//     let value="vikas";  // Block-scoped - only exists inside these { }
// }
// console.log(value);  // Error: value is not defined (outside the block)

// =============================================================================
// EXAMPLE 3: FUNCTION SCOPE + ACCESSING GLOBAL VARIABLES
// =============================================================================
// Function can access variables from outer (global) scope
// function test() {
// //   let a = 20;  // If uncommented, creates local 'a' that shadows global 'a'
//   console.log(a);  // Accesses global 'a' (10) via scope chain
// }
// test();  // Prints: 10
// console.log(a);  // Prints: 10 (global variable still accessible)
// =============================================================================
// EXAMPLE 4: LEXICAL SCOPE (NESTED FUNCTIONS)
// =============================================================================
// Inner functions have access to outer function's variables
// function outer() {
//   let a = 10;  // Outer function's local variable
//
//   function inner() {
//     // inner() can access variables from outer() due to lexical scope
//     // This is the basis of closures
//   }
//   inner();  // Call inner function
// }
//
// outer();  // Call outer function
// Inner function can "see" outer function's variables, but not vice versa

// =============================================================================
// EXAMPLE 5: CLOSURE - THE MAIN DEMONSTRATION
// =============================================================================
// This is a classic closure example showing data persistence

function outer() {
  let a = 10; // This variable will be "captured" by the inner function

  function inner() {
    console.log(a); // inner() has access to 'a' even after outer() returns!
  }

  return inner; // Return the inner function (not calling it yet)
}

// outer() has finished executing, but 'a' is NOT destroyed!
// outer();  // This would just call outer and discard the returned function

let res = outer(); // res now holds the inner function
// At this point, outer() has finished executing
// But inner() still has access to 'a' via closure!

// console.log(res);  // Shows: [Function: inner]
res(); // Calling inner() - prints: 10
// Even though outer() finished, 'a' is still accessible!

// WHY THIS WORKS (CLOSURE):
// 1. inner() is defined inside outer(), so it has access to outer's variables
// 2. When outer() returns inner, the function carries its scope with it
// 3. The variable 'a' stays alive because inner() still references it
// 4. This creates a "closure" - inner() closes over the variable 'a'
// 5. 'a' remains private - only accessible through res()

// PRACTICAL USE:
// This pattern creates private variables and data encapsulation!
