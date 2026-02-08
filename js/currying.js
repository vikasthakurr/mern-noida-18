/*

WHAT IS CURRYING?
- A functional programming technique
- Transforms a function with multiple arguments into a sequence of functions
- Each function takes a single argument and returns another function
- Named after mathematician Haskell Curry
- Creates specialized functions from general ones

WHY USE CURRYING?
- Creates reusable, specialized functions from general ones
- Enables partial application (pre-filling some arguments)
- Improves code composition and readability
- Makes functions more modular and testable
- Useful for creating utility functions

HOW CURRYING WORKS:
Instead of: function(a, b, c) { }
You get:    function(a) { return function(b) { return function(c) { } } }

EXAMPLE:
Regular:  multiply(2, 3) → 6
Curried:  multiply(2)(3) → 6

KEY CONCEPTS:
- Transformation: Multi-argument function → Chain of single-argument functions
- Partial Application: Pre-filling some arguments for reuse
- Function Composition: Combining functions to create new functionality
- Closure: Inner functions remember outer function's arguments

COMMON USE CASES:
- Creating specialized versions of generic functions
- Event handlers with pre-configured parameters
- Configuration functions
- Logging and debugging utilities
- Functional composition in libraries like Ramda, Lodash

*/

// Currying is a functional programming technique where a function with multiple arguments
// is transformed into a sequence of nesting functions, each taking a single argument.
// This can be useful for creating more specialized and reusable functions.

/*
 * Traditional function with multiple parameters
 * - Takes all arguments at once: autoMailer(to, sub, body)
 * - Cannot create partially applied versions
 * - Less flexible for creating specialized functions
 */
// function autoMailer(to, sub, body) {
//   console.log(
//     `mail has been sent to ${to} with subject ${sub} and body ${body}`,
//   );
// }
// autoMailer("vikas@gmail.com", "order details", "Here are your order details...");

/*
 * CURRIED VERSION - Each parameter becomes a separate function
 *
 * HOW IT WORKS:
 * 1. autoMailer(to) returns a function that expects 'sub'
 * 2. That function returns another function that expects 'body'
 * 3. The final function performs the action
 *
 * ADVANTAGES:
 * - Can create partially applied functions
 * - More flexible and reusable
 * - Enables function specialization
 * - Better for functional composition
 */
function autoMailer(to) {
  // The outer function takes the first argument 'to' and returns a new function.
  return function (sub) {
    // This inner function takes the second argument 'sub' and returns another new function.
    return function (body) {
      // The innermost function takes the final argument 'body' and performs the action.
      // All three arguments are accessible via closure!
      console.log(
        `mail has been sent to ${to} with subject ${sub} and body ${body}`,
      );
    };
  };
}

/*
 * METHOD 1: Call all at once with chained parentheses
 * - autoMailer(arg1)(arg2)(arg3)
 * - Each () provides the next argument
 * - Final () executes the innermost function
 */
// To call the curried function, you can chain the calls like this:
autoMailer("vikas@gmail.com")("order details")(
  "Here are your order details...",
);

/*
 * PARTIAL APPLICATION: Pre-filling some arguments
 *
 * WHAT'S HAPPENING:
 * 1. autoMailer("vikas@gmail.com") creates a function with 'to' pre-filled
 * 2. This function is stored in mailToVikas
 * 3. mailToVikas now only needs 'sub' and 'body' arguments
 * 4. The 'to' parameter is "remembered" via closure
 *
 * BENEFITS:
 * - Create specialized functions from general ones
 * - Reduce code duplication
 * - Create configuration presets
 * - Improve code readability
 */
// One of the advantages of currying is that you can create partially applied functions.
// For example, you can create a function that always sends mail to a specific person.
const mailToVikas = autoMailer("vikas@gmail.com");
// mailToVikas is now a specialized function that always emails vikas@gmail.com
// It only needs subject and body

/*
 * Now we can reuse mailToVikas with different subjects and bodies
 * - 'to' is always "vikas@gmail.com" (pre-filled)
 * - Only need to provide 'sub' and 'body'
 * - Much cleaner and more maintainable than repeating the email address
 */
// Now you can reuse mailToVikas with different subjects and bodies.
mailToVikas("order details")("Your order has been shipped.");
mailToVikas("password reset")(
  "Please reset your password using the link below.",
);

/*
 * REAL-WORLD CURRYING EXAMPLES
 *
 * 1. LOGGING UTILITY:
 *    const log = (level) => (message) => (context) => {
 *      console.log(`[${level}] ${message}`, context);
 *    };
 *    const errorLog = log("ERROR");
 *    const errorInAuth = errorLog("Authentication failed");
 *    errorInAuth({ user: "john" }); // [ERROR] Authentication failed { user: 'john' }
 *
 * 2. EVENT HANDLERS:
 *    const trackEvent = (category) => (action) => (label) => {
 *      analytics.track({ category, action, label });
 *    };
 *    const trackButton = trackEvent("button");
 *    const trackButtonClick = trackButton("click");
 *    trackButtonClick("signup"); // Pre-configured tracking
 *
 * 3. DATABASE QUERIES:
 *    const query = (table) => (column) => (value) => {
 *      return db.select().from(table).where(column, value);
 *    };
 *    const queryUsers = query("users");
 *    const queryUsersByEmail = queryUsers("email");
 *    queryUsersByEmail("john@example.com");
 *
 * CURRYING vs PARTIAL APPLICATION
 *
 * CURRYING:
 * - Transforms n-argument function into n functions with 1 argument each
 * - Always returns a function until all arguments are provided
 * - Example: f(a, b, c) becomes f(a)(b)(c)
 *
 * PARTIAL APPLICATION:
 * - Pre-fills some arguments, returns function expecting remaining args
 * - Can pre-fill any number of arguments
 * - Example: f(a, b, c) with 'a' pre-filled becomes f_partial(b, c)
 *
 * CURRYING ENABLES PARTIAL APPLICATION!
 * - Curried functions make partial application easy
 * - You can stop at any level to create a specialized function
 *
 */
