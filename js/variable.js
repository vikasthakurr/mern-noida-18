/*
 * ============================================
 * JAVASCRIPT VARIABLES - COMPREHENSIVE GUIDE
 * ============================================
 *
 * Variables are containers for storing data values in JavaScript.
 * JavaScript provides three ways to declare variables: var, let, and const
 *
 * DEFINITIONS:
 * -----------
 * 1. VAR - Function-scoped or globally-scoped variable (ES5)
 * 2. LET - Block-scoped variable that can be reassigned (ES6)
 * 3. CONST - Block-scoped variable that cannot be reassigned (ES6)
 *
 * KEY CONCEPTS:
 * ------------
 * - Scope: The region of code where a variable is accessible
 * - Hoisting: JavaScript's behavior of moving declarations to the top
 * - Temporal Dead Zone (TDZ): Period between entering scope and declaration
 * - Redeclaration: Declaring the same variable name again
 * - Reassignment: Changing the value of an existing variable
 */

// ============================================
// 1. CONST - Constant Variables
// ============================================
/*
 * CONST creates a read-only reference to a value
 * - Cannot be reassigned after initialization
 * - Must be initialized at the time of declaration
 * - Block-scoped (only accessible within the block where defined)
 * - Cannot be redeclared in the same scope
 * - Hoisted but not initialized (Temporal Dead Zone applies)
 *
 * BEST PRACTICE: Use const by default unless you need to reassign
 */

// "use strict"
// const name="vikas"
// const name="akhilesh"  // ❌ Error: Cannot redeclare 'name' in the same scope
// name= "akash"          // ❌ Error: Cannot reassign a const variable
// console.log(name)

// ============================================
// 2. LET - Block-Scoped Variables
// ============================================
/*
 * LET creates a block-scoped variable
 * - Can be reassigned after initialization
 * - Block-scoped (only accessible within the block where defined)
 * - Cannot be redeclared in the same scope
 * - Hoisted but not initialized (Temporal Dead Zone applies)
 * - Preferred over var in modern JavaScript
 *
 * USE CASE: When you need to reassign the variable value
 */

// let salary=1234
// salary=2345            // ✅ Reassignment is allowed with let
// console.log(salary)    // Output: 2345

// ============================================
// 3. VAR - Function-Scoped Variables (Legacy)
// ============================================
/*
 * VAR creates a function-scoped or globally-scoped variable
 * - Can be reassigned after initialization
 * - Function-scoped or globally-scoped (NOT block-scoped)
 * - Can be redeclared in the same scope (problematic behavior)
 * - Hoisted and initialized with 'undefined'
 * - Prone to bugs due to lack of block scope
 *
 * NOTE: Avoid using var in modern JavaScript - use let or const instead
 */

// var name="vikas"
// var name="akash"       // ✅ Redeclaration allowed with var (but not recommended)
// name="vipin"           // ✅ Reassignment allowed with var

// ============================================
// 4. SCOPE - Understanding Variable Accessibility
// ============================================
/*
 * SCOPE determines where a variable can be accessed in your code
 *
 * TYPES OF SCOPE:
 * 1. Global Scope: Accessible everywhere in the program
 * 2. Function Scope: Accessible only within the function (var, let, const)
 * 3. Block Scope: Accessible only within the block {} (let, const only)
 *
 * VAR is function-scoped:
 * - Accessible throughout the entire function
 * - NOT limited to block scope (if, for, while blocks)
 *
 * LET and CONST are block-scoped:
 * - Only accessible within the block {} where they are defined
 * - This includes if statements, loops, and any code within curly braces
 */

// function abc(){
//     var salary=123     // Function-scoped: accessible anywhere in abc()
// }
// // console.log(salary) // ❌ Error: salary is not accessible outside the function

// ============================================
// 5. BLOCK SCOPE EXAMPLE
// ============================================
/*
 * Block Scope: Variables declared with let/const inside {} are only
 * accessible within that block
 *
 * Block: Any code within curly braces {}, including:
 * - if/else statements
 * - for/while loops
 * - standalone blocks
 */

// {
//     // This is a block - let and const variables here are block-scoped
//     // var variables here would be accessible outside this block
// }

// ============================================
// 6. 'this' KEYWORD IN GLOBAL SCOPE
// ============================================
/*
 * 'this' in the global context:
 * - In browsers: refers to the window object
 * - In Node.js: refers to the global object
 * - In strict mode: undefined in functions
 */

// console.log(this)      // Global object (window in browser, global in Node.js)

// ============================================
// 7. TEMPORAL DEAD ZONE (TDZ)
// ============================================
/*
 * Temporal Dead Zone: The period between entering scope and variable declaration
 * where the variable exists but cannot be accessed
 *
 * HOW IT WORKS:
 * - let and const are hoisted to the top of their scope
 * - BUT they are not initialized until the declaration line is executed
 * - Accessing them before declaration results in ReferenceError
 *
 * WHY IT EXISTS:
 * - Prevents bugs from using variables before they are declared
 * - Encourages better coding practices
 *
 * EXAMPLE BELOW:
 * - 'a' is in the TDZ from the start of the scope until line where 'let a=10' executes
 * - Accessing 'a' before declaration throws: "Cannot access 'a' before initialization"
 */

console.log(a); // ❌ ReferenceError: Cannot access 'a' before initialization (TDZ)
let a = 10;

/*
 * ============================================
 * HOISTING - Variable Declaration Behavior
 * ============================================
 *
 * HOISTING: JavaScript moves variable and function declarations to the top
 * of their scope during the compilation phase
 *
 * HOW DIFFERENT DECLARATIONS BEHAVE:
 *
 * 1. VAR:
 *    - Declaration is hoisted
 *    - Initialized with 'undefined'
 *    - Can be accessed before declaration (returns undefined)
 *
 * 2. LET and CONST:
 *    - Declaration is hoisted
 *    - NOT initialized (remains in TDZ)
 *    - Cannot be accessed before declaration (ReferenceError)
 *
 * EXAMPLE WITH VAR:
 * console.log(x);  // undefined (not an error)
 * var x = 5;
 *
 * EXAMPLE WITH LET:
 * console.log(y);  // ReferenceError: Cannot access 'y' before initialization
 * let y = 5;
 */

/*
 * ============================================
 * BEST PRACTICES
 * ============================================
 *
 * 1. ✅ Use 'const' by default
 * 2. ✅ Use 'let' when you need to reassign the variable
 * 3. ❌ Avoid 'var' in modern JavaScript (ES6+)
 * 4. ✅ Declare variables at the top of their scope
 * 5. ✅ Always initialize variables when declaring them
 * 6. ✅ Use descriptive variable names
 * 7. ✅ Use strict mode ("use strict") to catch common mistakes
 *
 * WHY AVOID VAR?
 * - Function scope can lead to unexpected behavior
 * - Can be redeclared accidentally
 * - Lacks the safety of the temporal dead zone
 * - Block scope (let/const) is more intuitive and less error-prone
 */
