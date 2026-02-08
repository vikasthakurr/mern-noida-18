/*
WHAT IS A CALLBACK FUNCTION?
- A function passed as an argument to another function
- Gets executed/invoked inside the outer function
- Allows functions to be composed and reused
- Fundamental part of asynchronous programming in JavaScript
- Enables non-blocking code execution

WHY USE CALLBACKS?
- Handle asynchronous operations (API calls, file reading, timers)
- Create flexible, reusable functions
- Implement event-driven programming
- Execute code after a task completes
- Avoid code duplication

KEY CONCEPTS:
- Functions are "first-class citizens" in JavaScript (can be passed as arguments)
- Callbacks can be synchronous or asynchronous
- Callback Hell: Nested callbacks that become hard to read and maintain
- Modern alternatives: Promises and async/await

COMMON USE CASES:
- Event listeners: addEventListener('click', callback)
- Array methods: map(), filter(), forEach()
- Timers: setTimeout(), setInterval()
- API calls: fetch().then(callback)
- File operations: readFile(path, callback)
*/
/*
 * This demonstrates a basic callback with setTimeout
 * - setTimeout is an asynchronous Web API
 * - The callback (cb) is executed AFTER the timeout completes
 * - This is the fundamental pattern for handling async operations
 */
// function sayHi(name, cb) {
//   setTimeout(() => { // setTimeout is an asynchronous function
//     console.log(`hi ${name}`);
//     cb(); // The callback is executed after the main function's task is complete.
//   }, 2000);
// }

// function sayBye() {
//   console.log("bye");
// }

// sayHi("akhilesh", sayBye); // Pass sayBye as a callback to sayHi.

/*
 * This simulates a sequence of operations using callbacks
 * - Each function takes a callback parameter
 * - Callbacks ensure operations happen in a specific order
 * - This is a synchronous demonstration (no actual delays)
 * - Real-world example: Making Maggi (instant noodles)
 */
function makeMaggi(raw, cb) {
  console.log("start making maggi");
  cb(); // Execute the next step
}

function waterBoil(cb) {
  console.log("water boiled add magii and masala");
  cb();
}

function serveMaggi(cb) {
  console.log("maggi ready for serve");
  cb();
}

/*
 * CALLBACK HELL DEMONSTRATION:
 * This nested structure is often called "Callback Hell" or "Pyramid of Doom"
 * - Each callback is nested inside the previous one
 * - Creates a "pyramid" shape that's hard to read
 * - Difficult to maintain and debug
 * - Error handling becomes complex
 *
 * PROBLEMS WITH CALLBACK HELL:
 * - Reduced readability (horizontal scrolling)
 * - Hard to add error handling
 * - Difficult to debug
 * - Hard to refactor
 *
 * SOLUTIONS:
 * - Use Promises (then chaining)
 * - Use async/await (modern approach)
 * - Break into named functions
 * - Use Promise.all() for parallel operations
 */
// makeMaggi("yapee", () => {
//   waterBoil(() => {
//     serveMaggi(() => {
//       console.log("maggii process is done");
//     });
//   });
// });

// TODO: Create a similar callback chain for making a sandwich

function makeSandwich(bread, cb) {
  console.log(` make a ${bread} sandwich`);
  cb();
}
function applySauce(sauce, cb) {
  console.log(`apply ${sauce} sauce`);
  cb();
}

function stuffing(stuff, cb) {
  console.log(`stuff with ${stuff}`);
  cb();
}

function grilled(cb) {
  console.log("grilled");
  cb();
}
function serveSandwich(cb) {
  console.log("serve");
  cb();
}

/*
 * COMMON MISTAKE: Calling Functions Instead of Passing Them
 * ❌ INCORRECT APPROACH:
 * - applySauce("spicy") EXECUTES the function immediately
 * - Returns undefined (since no return statement)
 * - makeSandwich receives: ("brown", undefined, undefined, undefined, undefined)
 * - This is NOT callback chaining!
 *
 * WHY IT'S WRONG:
 * - Functions execute out of order (all at once)
 * - No sequential flow control
 * - Cannot handle asynchronous operations
 *
 * CORRECT APPROACH:
 * - Pass functions as arguments (without calling them)
 * - Let the receiving function call them at the right time
 */
// makeSandwich(
//   "brown",
//   applySauce("spicy"),     // ❌ This calls the function immediately!
//   stuffing("paneer"),       // ❌ Wrong!
//   grilled(),                // ❌ Wrong!
//   serveSandwich(),          // ❌ Wrong!
// );

// Correct way using nested callbacks, which again leads to callback hell.
// makeSandwich("brown", () => {
//   applySauce("spicy", () => {
//     stuffing("paneer", () => {
//       grilled(() => {
//         serveSandwich(() => {
//           console.log("sandwich done please eat it");
//         });
//       });
//     });
//   });
// });

/*
 * MODERN ALTERNATIVES TO CALLBACKS
 *
 * 1. PROMISES:
 *    - Cleaner syntax with .then() chaining
 *    - Better error handling with .catch()
 *    - Example: fetch(url).then(response => response.json()).then(data => ...)
 *
 * 2. ASYNC/AWAIT:
 *    - Makes asynchronous code look synchronous
 *    - Easiest to read and maintain
 *    - Example: const data = await fetch(url)
 *
 * 3. PROMISE.ALL:
 *    - Run multiple async operations in parallel
 *    - Wait for all to complete
 *    - Example: await Promise.all([promise1, promise2, promise3])
 *
 * WHEN TO USE CALLBACKS:
 * - Simple event handlers
 * - Built-in JavaScript methods (forEach, map, filter)
 * - Legacy code maintenance
 * - When working with libraries that use callback patterns
 *
 * BEST PRACTICE: For new code, prefer async/await over callbacks
 */
