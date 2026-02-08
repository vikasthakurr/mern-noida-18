/*
WHAT IS A HIGHER-ORDER FUNCTION?
- A function that either:
  1. Takes one or more functions as arguments, OR
  2. Returns a function as its result
- Core concept in functional programming
- Enables function composition and abstraction
- Makes code more modular and reusable

WHY USE HIGHER-ORDER FUNCTIONS?
- Code reusability: Write generic functions that work with various operations
- Abstraction: Hide complex logic behind simple function calls
- Composition: Combine simple functions to create complex behavior
- Cleaner code: Reduce repetition and improve readability
- Functional programming: Enable declarative programming style

FUNCTIONS AS FIRST-CLASS CITIZENS:
In JavaScript, functions are treated like any other value:
- Can be assigned to variables
- Can be passed as arguments to other functions
- Can be returned from functions
- Can be stored in data structures (arrays, objects)

COMMON HIGHER-ORDER FUNCTIONS IN JAVASCRIPT:
- Array methods: map(), filter(), reduce(), forEach(), some(), every()
- Timers: setTimeout(), setInterval()
- Event handlers: addEventListener()
- Custom HOFs: create your own reusable patterns

*/

// A higher-order function is a function that either takes one or more functions as arguments, or returns a function as its result.
// This allows for more abstract and reusable code.

/*
 * FOREACH:
 * - Iterates over array elements
 * - Executes callback for each element
 * - Doesn't return anything (undefined)
 * - Used for side effects (logging, DOM manipulation, etc.)
 */
// Example of built-in higher-order functions: forEach and map

// let arr = [12, 3, 3, 45, 5];

// arr.forEach((ele) => {
//   console.log(ele);  // Just logs each element
// });

/*
 * MAP:
 * - Transforms each element in an array
 * - Returns a NEW array with transformed values
 * - Doesn't modify the original array
 * - Pure function (no side effects)
 */
// The map() method creates a new array populated with the results of calling a provided function on every element in the calling array.
// arr.map((ele) => {
//   console.log(ele * 2);  // ⚠️  Just logging, not returning!
// });
// console.log(arr); // map does not modify the original array
// To use map properly, you should return values and store the result:
// const doubled = arr.map(ele => ele * 2);  // ✅ Returns new array [24, 6, 6, 90, 10]

/*
 * REAL-WORLD SCENARIO: Tax Calculation System
 * - Different tax rates for different situations
 * - Single HOF handles all calculations
 * - Callback functions define the specific tax calculation
 */
let salary = [100, 200, 300, 400];
let salary2 = [400, 600, 1000];

/*
 * These are simple functions that perform specific calculations
 * - Will be passed to the higher-order function
 * - Each represents a different tax rate
 */
// These are callback functions that can be passed to a higher-order function.
function calculateTen(salary) {
  return salary * 0.1; // 10% tax
}

function twentyPercent(salary) {
  return salary * 0.2; // 20% tax
}

/*
 * calculateTax is a HIGHER-ORDER FUNCTION because:
 * - It takes a function (cb) as an argument
 * - It applies that function to each array element
 * - Returns a new array with results
 *
 * BENEFITS:
 * - Reusable: Works with any calculation function
 * - Flexible: Can use different tax rates without changing the HOF
 * - Maintainable: Separation of concerns (calculation vs iteration logic)
 */
// This is an example of a higher-order function that takes an array and a callback function.
// It iterates over the array and applies the callback to each element.
// function calculateTax(salary, cb) {
//   let res = [];
//   for (let i = 0; i < salary.length; i++) {
//     res.push(cb(salary[i]));  // Apply callback to each element
//   }
//   return res;
// }
// Usage:
// const taxedSalaries = calculateTax(salary, calculateTen);
// console.log(taxedSalaries);  // [10, 20, 30, 40]

/*
 * ADVANCED TECHNIQUE: Adding custom method to Array.prototype
 * - Makes the method available on ALL arrays
 * - Similar to built-in methods like map(), filter(), reduce()
 * - 'this' refers to the array instance
 *
 * HOW IT WORKS:
 * 1. Define method on Array.prototype
 * 2. Use 'this' to reference the current array
 * 3. Call it like: array.calculateTax(callback)
 *
 * ⚠️  NOTE: Modifying built-in prototypes is generally discouraged
 * - Can cause conflicts with other libraries
 * - May break in future JavaScript versions
 * - Better to use standalone functions in real projects
 */
// Here we are creating a custom higher-order function on the Array prototype.
// This allows any array to call this function directly.
// The 'this' keyword refers to the array itself.
Array.prototype.calculateTax = function (cb) {
  let res = []; // Store results
  for (let i = 0; i < this.length; i++) {
    // 'this' is the array
    res.push(cb(this[i])); // Apply callback to each element
  }
  return res; // Return new array with results
};

/*
 * Now any array can use the calculateTax method
 * - salary2.calculateTax(calculateTen)
 * - Same behavior as the standalone HOF, but cleaner syntax
 * - The callback determines what calculation to perform
 */
// console.log(calculateTax(twentyPercent));  // ❌ This would be calling on wrong context
console.log(salary2.calculateTax(calculateTen));
// Output: [40, 60, 100] (10% of each salary in salary2)

