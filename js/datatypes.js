/*
 * ========================================================
 * JAVASCRIPT DATA TYPES - COMPREHENSIVE GUIDE
 * ========================================================
 *
 * Data types define the kind of values that can be stored and manipulated
 * JavaScript has two main categories: Primitive and Reference types
 *
 * PRIMITIVE TYPES (7 types):
 * --------------------------
 * 1. Number - Numeric values (integers and decimals)
 * 2. String - Textual data
 * 3. Boolean - true or false
 * 4. Undefined - Variable declared but not assigned
 * 5. Null - Intentional absence of value
 * 6. Symbol - Unique identifier (ES6)
 * 7. BigInt - Large integers (ES2020)
 *
 * REFERENCE TYPES (Objects):
 * --------------------------
 * 1. Object - Collection of key-value pairs
 * 2. Array - Ordered list of values
 * 3. Function - Reusable block of code
 * 4. Date, Map, Set, etc. - Special object types
 *
 * KEY CONCEPTS:
 * ------------
 * - Stack Memory: Stores primitive values (fixed size)
 * - Heap Memory: Stores reference types (dynamic size)
 * - Pass by Value: Primitives create copies
 * - Pass by Reference: Objects share same memory reference
 */

// ========================================================
// 1. PRIMITIVE DATA TYPES - STORED IN STACK
// ========================================================
/*
 * STACK MEMORY CHARACTERISTICS:
 * - Fixed size allocation
 * - Fast access (LIFO - Last In First Out)
 * - Automatically managed
 * - Variables hold actual values
 * - Creating copy creates independent value
 *
 * PRIMITIVE TYPES ARE IMMUTABLE:
 * - The value itself cannot be changed
 * - Reassignment creates a new value in memory
 */

// var a = 10;

// function double(num) {
//   return num * 2;
// }
// var result1 = double(15);        // Passing primitive by value (copies 15)
// console.log(result1);            // Output: 30
// var result2 = double(a);         // Passing primitive by value (copies 10)
// console.log(result2);            // Output: 20
// let a=10;
// console.log(a)

// ========================================================
// 2. REFERENCE TYPES - STORED IN HEAP
// ========================================================
/*
 * HEAP MEMORY CHARACTERISTICS:
 * - Dynamic size allocation
 * - Stores complex data structures
 * - Variables hold memory address (reference), not actual value
 * - Multiple variables can reference the same object
 * - Slower access compared to stack
 *
 * REFERENCE TYPES ARE MUTABLE:
 * - The object's properties can be modified
 * - All references point to the same object in memory
 */

// function sayHi() {
//   console.log("hi");
// }
// console.log(person);             // ❌ ReferenceError: Cannot access before initialization (TDZ)

// let person={
//   name:"vikas"                    // Object stored in heap, 'person' holds reference
// }

// ========================================================
// 3. PRIMITIVE TYPES - DETAILED EXAMPLES
// ========================================================

/*
 * NUMBER DATA TYPE:
 * - Represents both integers and floating-point numbers
 * - Range: -(2^53 - 1) to (2^53 - 1)
 * - Special values: Infinity, -Infinity, NaN (Not a Number)
 * - Stored in 64-bit floating point format (IEEE 754)
 */
// let salary=13234.23456;          // Number (floating-point)

/*
 * STRING DATA TYPE:
 * - Sequence of characters enclosed in quotes
 * - Can use single quotes (''), double quotes (""), or backticks (``)
 * - Backticks allow template literals and string interpolation
 * - Strings are immutable in JavaScript
 */
// let salary="vikas"               // String (reassigning same variable to different type)

/*
 * BOOLEAN DATA TYPE:
 * - Represents logical values: true or false
 * - Used for conditional logic and comparisons
 * - Falsy values: false, 0, "" (empty string), null, undefined, NaN
 * - All other values are truthy
 */
// let isMarried=false              // Boolean

/*
 * UNDEFINED DATA TYPE:
 * - Automatic value for declared but uninitialized variables
 * - Also returned when accessing non-existent object properties
 * - typeof undefined returns "undefined"
 * - Different from null (undefined is unintentional, null is intentional)
 */
// let value=undefined;             // Explicitly assigning undefined
// let value;                       // Implicitly undefined (no value assigned)
// console.log(typeof value)        // Output: "undefined"

// ========================================================
// 4. typeof OPERATOR
// ========================================================
/*
 * typeof: Returns a string indicating the type of a variable
 *
 * RETURN VALUES:
 * - "number" - Number type
 * - "string" - String type
 * - "boolean" - Boolean type
 * - "undefined" - Undefined type
 * - "object" - Objects, Arrays, null (⚠️ quirk: typeof null is "object")
 * - "function" - Functions
 * - "symbol" - Symbol type
 * - "bigint" - BigInt type
 *
 * SYNTAX: typeof variable OR typeof(variable)
 */

// ========================================================
// 5. REFERENCE TYPES - FUNCTION, OBJECT, ARRAY
// ========================================================

/*
 * FUNCTION:
 * - Functions are objects in JavaScript (first-class citizens)
 * - Can be assigned to variables, passed as arguments, returned from functions
 * - typeof function returns "function"
 */
// function name(){}                // Function declaration
// name()                           // Function invocation

/*
 * OBJECT:
 * - Collection of key-value pairs
 * - Keys are strings (or Symbols), values can be any type
 * - Stored in heap, variable holds reference
 * - typeof {} returns "object"
 */
// let obj={}                       // Empty object literal

/*
 * ARRAY:
 * - Special type of object for ordered collections
 * - Elements accessed by numeric index (0-based)
 * - Can hold mixed data types
 * - typeof [] returns "object" (not "array")
 */
// let arr=[]                       // Empty array literal

// ========================================================
// 6. PASS BY VALUE (PRIMITIVES)
// ========================================================
/*
 * PRIMITIVES ARE COPIED BY VALUE:
 * - When you assign a primitive to another variable, it creates a NEW COPY
 * - Both variables store independent values
 * - Changing one does NOT affect the other
 * - This is because primitives are stored directly in the stack
 *
 * EXAMPLE BELOW:
 * - 'a' stores value 10 in stack
 * - 'b=a' creates a NEW copy of 10 in a different stack location
 * - Changing 'b' to 20 only affects 'b', not 'a'
 */

// let a=10;                        // 'a' holds value 10 in stack
// let b=a;                         // 'b' gets a COPY of 10 (independent value)
// b=20;                            // Only 'b' is changed to 20
// console.log(b)                   // Output: 20
// console.log(a)                   // Output: 10 (unchanged - independent copy)

// ========================================================
// 7. PASS BY REFERENCE (OBJECTS)
// ========================================================
/*
 * OBJECTS ARE COPIED BY REFERENCE:
 * - When you assign an object to another variable, it copies the REFERENCE
 * - Both variables point to the SAME object in heap memory
 * - Changing one affects the other (both reference same memory location)
 * - This is because objects are stored in heap, variables hold memory address
 *
 * EXAMPLE BELOW:
 * - 'person' holds a reference to object in heap
 * - 'person2 = person' copies the reference (NOT the object)
 * - Both point to the same object, so modifying one affects both
 */

// let person = {
//   fname: "vikas",
// };

// ========================================================
// 8. COPYING OBJECTS - THREE METHODS
// ========================================================

/*
 * METHOD 1: SHALLOW COPY (Reference Assignment) - NOT A TRUE COPY
 * - Both variables point to the same object
 * - Modifying one affects the other
 * - This is NOT creating a copy, just another reference
 */
// // let person2 = person;          // ❌ Shallow reference (same object)

/*
 * METHOD 2: SPREAD OPERATOR (Shallow Copy)
 * - Creates a new object with copied properties
 * - Works for one level deep (shallow)
 * - Nested objects are still referenced
 * - ES6 feature: { ...object }
 */
// // let person2 = { ...person };   // ✅ Shallow copy (new object, 1 level deep)

/*
 * METHOD 3: DEEP COPY (Complete Independence)
 * - Creates completely independent copy
 * - Works for nested objects/arrays
 * - JSON.stringify converts to string, JSON.parse creates new object
 * - WARNING: Loses functions, undefined, Symbol, and Date objects
 */
// // let person2 = JSON.parse(JSON.stringify(person)); // ✅ Deep copy (fully independent)

// person2.fname = "akash";         // Modifying person2
// console.log(person2);            // person2 with fname: "akash"
// console.log(person);             // Original person (affected or not depends on method)

// ========================================================
// 9. SCOPE AND CLOSURE (ADVANCED CONCEPT)
// ========================================================
/*
 * SCOPE: Region where a variable is accessible
 *
 * TYPES OF SCOPE:
 * 1. Global Scope - Accessible everywhere
 * 2. Function Scope - Accessible within the function
 * 3. Block Scope - Accessible within {} (let/const only)
 *
 * LEXICAL SCOPING (CLOSURE):
 * - Inner functions have access to outer function variables
 * - Functions "remember" the scope in which they were created
 * - This creates a scope chain
 *
 * SCOPE CHAIN:
 * - JavaScript looks for variables in current scope first
 * - If not found, looks in outer scope
 * - Continues up the chain until global scope
 * - If not found anywhere, ReferenceError is thrown
 */

//todo
// let a=10;                        // Global scope variable 'a'
// function outer(){
//   let a=10;                      // Function scope 'a' (shadows global 'a')
//   console.log(a)                 // Accesses function-scoped 'a' (10)
//    function inner(){
//     console.log(a)               // Accesses outer function's 'a' via closure (10)

//     function inner1(){
//       let b=20;                  // Function scope 'b' (only accessible here)
//       console.log(a,b)           // Accesses 'a' from outer scope and local 'b'
//     }
//    }
// }

// console.log(a,b,a)               // ❌ Error: 'b' is not accessible (function-scoped)

/*
 * ========================================================
 * MEMORY MANAGEMENT SUMMARY
 * ========================================================
 *
 * STACK (Primitives):
 * - Number, String, Boolean, Undefined, Null, Symbol, BigInt
 * - Fixed size allocation
 * - Fast access
 * - Automatically deallocated when out of scope
 * - Variables store actual values
 * - Copy by VALUE (independent copies)
 *
 * HEAP (Reference Types):
 * - Objects, Arrays, Functions
 * - Dynamic size allocation
 * - Variables store memory addresses (references)
 * - Garbage collected when no references remain
 * - Copy by REFERENCE (shared memory location)
 *
 * ========================================================
 * BEST PRACTICES
 * ========================================================
 *
 * 1. ✅ Use const for objects/arrays when you won't reassign them
 * 2. ✅ Use spread operator or Object.assign() for shallow copies
 * 3. ✅ Use structured cloning or libraries (lodash) for deep copies
 * 4. ✅ Be aware of reference vs value when passing to functions
 * 5. ✅ Use typeof carefully (remember null returns "object")
 * 6. ✅ Prefer Array.isArray() to check for arrays
 * 7. ⚠️ Be cautious with JSON.parse(JSON.stringify()) - loses functions
 * 8. ✅ Understand scope chain for debugging variable access issues
 *
 * COMMON PITFALLS:
 * ---------------
 * - Thinking object assignment creates a copy (it doesn't!)
 * - Using == instead of === (type coercion issues)
 * - Forgetting typeof null is "object" (historical bug)
 * - Modifying objects passed to functions (side effects)
 * - Shallow copying nested objects (nested refs still shared)
 */
