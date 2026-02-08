/*
WHAT IS A PROMISE?
- An object representing the eventual completion or failure of an async operation
- A cleaner alternative to callbacks for handling asynchronous code
- Introduced in ES6 (ES2015) to solve callback hell
- Returns a value at some point in the future
- Like a "promise" to deliver a result later

WHY USE PROMISES?
- Avoid callback hell (nested callbacks)
- Better error handling with .catch()
- Chainable syntax for sequential async operations
- Parallel execution with Promise.all()
- More readable and maintainable than callbacks

PROMISE STATES:
1. Pending: Initial state, neither fulfilled nor rejected
2. Fulfilled (Resolved): Operation completed successfully
3. Rejected: Operation failed

PROMISE METHODS:
- .then(): Handle successful resolution
- .catch(): Handle errors/rejection
- .finally(): Run code after promise settles (success or failure)

PROMISE STATIC METHODS:
- Promise.resolve(): Create resolved promise
- Promise.reject(): Create rejected promise
- Promise.all(): Wait for all promises to resolve
- Promise.race(): Wait for first promise to settle
- Promise.any(): Wait for first promise to resolve
- Promise.allSettled(): Wait for all promises to settle

ASYNC/AWAIT (ES8/ES2017):
- Syntactic sugar over Promises
- Makes async code look synchronous
- Easier to read and write than .then() chains
- Error handling with try/catch blocks

=============================================================================
*/

/*
 * FETCH API:
 * - Modern way to make HTTP requests
 * - Returns a Promise
 * - Replaces older XMLHttpRequest
 * - Promise-based, cleaner syntax
 *
 * PROMISE CHAINING:
 * - .then() handles successful resolution
 * - Can chain multiple .then() for sequential operations
 * - Each .then() returns a new Promise
 * - .catch() handles any error in the chain
 * - .finally() runs regardless of success/failure
 */
// The fetch API is a modern interface that allows you to make network requests. It returns a Promise.
// fetch("https://dummyjson.co/products")
//   .then((res) => res.json()) // .then() is called when the promise is fulfilled. We parse the response as JSON.
//   .then((data) => console.log(data)) // The second .then() receives the parsed JSON data.
//   .catch((err) => console.log(err)) // .catch() is called if the promise is rejected at any point.
//   .finally(() => console.log("process done")); // .finally() is always called, whether the promise was fulfilled or rejected.

/*
 * Promise.reject():
 * - Creates a Promise that is already rejected
 * - Useful for testing or forcing errors
 * - Can pass error message or error object
 */
// Creating a rejected promise explicitly.
// const p1 = Promise.reject("notfound");

// p1.then((data) => console.log(data)).catch((err) => {
//   console.log(err);  // Catches the rejection: "notfound"
// });


/*
 * Promise.any():
 * - Waits for the FIRST promise to be fulfilled (resolved)
 * - Ignores rejected promises
 * - Only rejects if ALL promises are rejected
 * - Useful when you want the first successful result from multiple sources
 *
 * USE CASE:
 * - Fetch from multiple CDNs, use whichever responds first
 * - Try multiple API endpoints, use first successful response
 */
// let p1 = Promise.reject("success1");
// let p2 = Promise.reject("erro4 404");
// let p3 = Promise.reject("happy happy");

// Promise.any waits for the first promise to be fulfilled. It rejects only if all promises are rejected.
// Promise.any([p1, p2, p3])
//   .then((data) => {
//     console.log(data);  // Would log the first resolved promise value
//   })
//   .catch((err) => {
//     console.log(err);  // If all promises reject: "AggregateError: All promises were rejected"
//   });


/*
 * CHAINING BENEFITS:
 * - Sequential async operations
 * - Avoids callback hell
 * - Clean, readable syntax
 * - Single .catch() handles all errors in the chain
 * - .finally() for cleanup code
 *
 * EXAMPLE CHAIN:
 * fetch()
 *   .then(response => response.json())    // Parse response
 *   .then(data => processData(data))      // Process data
 *   .then(processed => saveToDb(processed)) // Save to database
 *   .then(() => notifyUser())              // Notify user
 *   .catch(error => handleError(error))    // Handle any error
 *   .finally(() => cleanup())               // Always clean up
 */
// A promise chain allows you to sequence asynchronous operations.
// fetch().then().then().then().then().then().catch().finally()

/*
 * ASYNCHRONOUS EXECUTION:
 * - JavaScript is single-threaded
 * - setTimeout is a Web API (runs in browser, not JS engine)
 * - Async operations don't block the main thread
 * - Callbacks/promises are placed in task queue
 * - Event loop processes queue when call stack is empty
 *
 * HOW IT WORKS:
 * 1. setTimeout() is called → registered in Web API
 * 2. Main thread continues (doesn't wait)
 * 3. console.log executes immediately
 * 4. After 5 seconds, callback moves to task queue
 * 5. Event loop moves callback to call stack when stack is empty
 * 6. Callback executes
 */
// Asynchronous nature of JavaScript. setTimeout is a Web API that runs after the specified time,
// without blocking the main thread.
// setTimeout(() => {
//   console.log("class chl rhi he");  // Executes after 5 seconds
// }, 5000);

// console.log("meri b class h"); // This will be logged before the setTimeout callback.
// Output order:
// 1. "meri b class h" (executes immediately)
// 2. "class chl rhi he" (executes after 5 seconds)


/*
 * ASYNC/AWAIT (ES2017):
 * - Syntactic sugar over Promises
 * - Makes async code look and behave more like synchronous code
 * - Easier to read and understand
 * - Better error handling with try/catch
 *
 * ASYNC FUNCTION:
 * - Declared with 'async' keyword
 * - Always returns a Promise
 * - Can use 'await' inside
 *
 * AWAIT KEYWORD:
 * - Pauses function execution until Promise resolves
 * - Can only be used inside async functions
 * - Makes code wait for async operations without blocking main thread
 * - Returns the resolved value of the Promise
 *
 * ERROR HANDLING:
 * - Use try/catch blocks (like synchronous code)
 * - Much cleaner than .catch() for complex logic
 */
// async/await is syntactic sugar over Promises, making asynchronous code look more like synchronous code.
// An async function always returns a promise.
// async function vikas() {
//   try {
//     // The 'await' keyword pauses the execution of the function until the promise is resolved.
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     // Errors in async/await are handled with try...catch blocks.
//     console.log(error);
//   }
// }

// vikas();

/*
 * PROMISE vs CALLBACK vs ASYNC/AWAIT COMPARISON
 *
 * CALLBACKS (Old way):
 * fetchUser(id, (user) => {
 *   fetchPosts(user.id, (posts) => {
 *     fetchComments(posts[0].id, (comments) => {
 *       console.log(comments);  // Callback hell! Hard to read
 *     });
 *   });
 * });
 *
 * PROMISES (ES6):
 * fetchUser(id)
 *   .then(user => fetchPosts(user.id))
 *   .then(posts => fetchComments(posts[0].id))
 *   .then(comments => console.log(comments))
 *   .catch(error => console.log(error));
 *
 * ASYNC/AWAIT (ES8 - Modern):
 * async function getData() {
 *   try {
 *     const user = await fetchUser(id);
 *     const posts = await fetchPosts(user.id);
 *     const comments = await fetchComments(posts[0].id);
 *     console.log(comments);  // Cleanest, most readable!
 *   } catch (error) {
 *     console.log(error);
 *   }
 * }
 *
 *
 * 1. PROMISE.ALL() - Wait for all promises:
 *    const [users, posts, comments] = await Promise.all([
 *      fetchUsers(),
 *      fetchPosts(),
 *      fetchComments()
 *    ]);
 *    // All three fetch in parallel, wait for all to complete
 *
 * 2. PROMISE.RACE() - First to finish wins:
 *    const result = await Promise.race([
 *      fetchFromServer1(),
 *      fetchFromServer2()
 *    ]);
 *    // Use whichever server responds first
 *
 * 3. SEQUENTIAL ASYNC OPERATIONS:
 *    for (const item of items) {
 *      await processItem(item);  // Wait for each to complete before next
 *    }
 *
 * 4. PARALLEL ASYNC OPERATIONS:
 *    await Promise.all(items.map(item => processItem(item)));
 *    // Process all items in parallel
 *
 *
 * 1. ✅ Use async/await for new code (cleaner than .then())
 * 2. ✅ Always handle errors with try/catch or .catch()
 * 3. ✅ Use Promise.all() for parallel operations
 * 4. ✅ Avoid mixing callbacks and promises
 * 5. ✅ Don't forget to await promises (common mistake!)
 * 6. ✅ Use Promise.allSettled() when you need all results regardless of failures
 * 7. ⚠️  Remember: await only works inside async functions
 * 8. ⚠️  Don't use await in loops unless you need sequential execution
 *
*/
