/*
WHAT IS FUNCTION BORROWING?
- A technique where a method from one object is used by another object
- Allows reusing methods without code duplication
- Achieved using call(), apply(), and bind() methods
- Relies on functions being first-class citizens in JavaScript
- Temporarily changes the 'this' context of a function

WHY USE FUNCTION BORROWING?
- Code reusability: Use the same method across multiple objects
- DRY principle: Don't Repeat Yourself
- Flexibility: Apply methods to different objects dynamically
- Method sharing: Objects can share functionality without inheritance
- Avoid copying methods to every object

KEY CONCEPTS:
- 'this' keyword: Refers to the object that called the function
- Context binding: Changing what 'this' refers to
- call(): Invoke immediately with specified 'this' and individual arguments
- apply(): Invoke immediately with specified 'this' and array of arguments
- bind(): Create new function with 'this' permanently bound

REAL-WORLD ANALOGY:
Imagine you have a calculator with an "add" method. Instead of building
a new calculator for every person, you can let multiple people borrow
the same calculator's add method.

*/
// Function borrowing is a technique in JavaScript where a method from one object is used by another object.
// This is possible because functions are first-class citizens in JavaScript.
// We can achieve this using the call(), apply(), and bind() methods.
/*
 * person1: Has a 'print' method
 * person2: Doesn't have a 'print' method
 *
 * GOAL: Let person2 use person1's print method (function borrowing)
 */
let person1 = {
  fname: "vikas",
  age: 26,
  print: function (city) {
    // 'this' refers to the object that the function is called on.
    console.log(this.fname, this.age, city);
  },
};
// person1.print();  // Would use person1's data: "vikas 26"

let person2 = {
  fname: "anil",
  age: 20,
  // person2 doesn't have its own 'print' method
};

// METHOD 1: call() - Invoke Immediately with Individual Arguments
/*
 * call() METHOD:
 * - Invokes the function IMMEDIATELY
 * - First argument: What 'this' should refer to
 * - Remaining arguments: Passed individually to the function
 * - Syntax: function.call(thisContext, arg1, arg2, arg3, ...)
 *
 * WHAT HAPPENS:
 * 1. person1.print.call(person2, "agra")
 * 2. The print function runs with 'this' = person2
 * 3. So this.fname = "anil", this.age = 20
 * 4. city parameter = "agra"
 * 5. Output: "anil 20 agra"
 */
// Here, we are "borrowing" the print method from person1 and calling it with person2 as the 'this' context.
// person1.print.call(person2, "agra");
// Output: "anil 20 agra" (using person2's data with person1's method)

// METHOD 2: apply() - Invoke Immediately with Array of Arguments
/*
 * apply() METHOD:
 * - Very similar to call()
 * - Invokes the function IMMEDIATELY
 * - First argument: What 'this' should refer to
 * - Second argument: Array of arguments for the function
 * - Syntax: function.apply(thisContext, [arg1, arg2, arg3])
 *
 * DIFFERENCE FROM call():
 * - call(): Arguments passed individually → fn.call(obj, arg1, arg2, arg3)
 * - apply(): Arguments passed as array → fn.apply(obj, [arg1, arg2, arg3])
 *
 * WHEN TO USE apply():
 * - When you have arguments in an array
 * - When the number of arguments is dynamic/variable
 * - Working with Math methods: Math.max.apply(null, [1,2,3,4,5])
 */
// The apply() method is similar to call(), but it takes arguments as an array.
// person1.print.apply(person2, ["agra"]);
// Output: "anil 20 agra" (same result as call, different syntax)

// METHOD 3: bind() - Create New Function with Bound Context
/*
 * bind() METHOD:
 * - Does NOT invoke the function immediately
 * - Returns a NEW function with 'this' permanently bound
 * - Can pre-fill (partially apply) some arguments
 * - The returned function can be called later
 * - Syntax: const newFn = function.bind(thisContext, arg1, arg2, ...)
 *
 * DIFFERENCE FROM call() and apply():
 * - call/apply: Execute immediately
 * - bind: Returns a function to execute later
 *
 * COMMON USE CASES:
 * - Event handlers: btn.addEventListener('click', obj.method.bind(obj))
 * - React: this.handleClick = this.handleClick.bind(this)
 * - Callbacks: setTimeout(obj.method.bind(obj), 1000)
 * - Creating specialized functions with pre-filled arguments
 *
 * HOW IT WORKS:
 * 1. person1.print.bind(person2, "agra") creates a new function
 * 2. In this new function, 'this' is always person2
 * 3. The first argument ("agra") is pre-filled
 * 4. Store this new function in printForPerson2
 * 5. Call printForPerson2() whenever you want
 */
// The bind() method creates a new function that has its 'this' keyword set to the provided value.
// It doesn't invoke the function immediately but returns a new function that you can call later.
// The returned function can be called with its own arguments.
// const printForPerson2 = person1.print.bind(person2, "agra");
// printForPerson2();  // Call the bound function later
// Output: "anil 20 agra"

// One-liner version: Create and immediately invoke the bound function
person1.print.bind(person2, "agra")();
// Breakdown: .bind() returns a function, then () calls it immediately

/*
 * COMPARISON SUMMARY
 *
 * call():
 * ✓ Invokes immediately
 * ✓ Arguments passed individually
 * ✓ Use when you know all arguments upfront
 * Example: fn.call(obj, arg1, arg2, arg3)
 *
 * apply():
 * ✓ Invokes immediately
 * ✓ Arguments passed as array
 * ✓ Use when arguments are in an array or variable
 * Example: fn.apply(obj, [arg1, arg2, arg3])
 *
 * bind():
 * ✓ Returns new function (doesn't invoke)
 * ✓ Can pre-fill arguments (partial application)
 * ✓ Use for event handlers, callbacks, or creating reusable functions
 * Example: const newFn = fn.bind(obj, arg1); newFn(arg2);
 *
 * REAL-WORLD EXAMPLES
 *
 * 1. FINDING MAX IN ARRAY:
 *    const numbers = [5, 6, 2, 3, 7];
 *    const max = Math.max.apply(null, numbers);
 *    // Modern alternative: Math.max(...numbers)
 *
 * 2. EVENT HANDLERS (React/Vanilla JS):
 *    class Component {
 *      constructor() {
 *        this.handleClick = this.handleClick.bind(this);  // Bind 'this'
 *      }
 *      handleClick() {
 *        console.log(this);  // 'this' refers to Component instance
 *      }
 *    }
 *
 * 3. ARRAY-LIKE TO ARRAY CONVERSION:
 *    function toArray() {
 *      return Array.prototype.slice.call(arguments);
 *    }
 *    // Modern alternative: Array.from(arguments) or [...arguments]
 *
 * 4. DEBOUNCING WITH CORRECT CONTEXT:
 *    const debouncedSearch = debounce(obj.search.bind(obj), 300);
 *
 */
