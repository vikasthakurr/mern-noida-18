/*
=============================================================================
                    JAVASCRIPT CONDITIONAL STATEMENTS
=============================================================================

WHAT ARE CONDITIONALS?
- Conditional statements allow you to execute different code based on conditions
- They control the flow of program execution
- Essential for decision-making in programming

=============================================================================
1. IF-ELSE STATEMENTS
=============================================================================

SYNTAX:
  if (condition) {
    // code to execute if condition is true
  } else if (anotherCondition) {
    // code to execute if first condition is false but this one is true
  } else {
    // code to execute if all conditions are false
  }

KEY POINTS:
- 'if' executes a block of code when the condition evaluates to true
- 'else if' allows checking multiple conditions sequentially
- 'else' is the fallback when all previous conditions are false
- Conditions are evaluated top-to-bottom; execution stops at first true condition
- You can have multiple 'else if' blocks but only one 'if' and one 'else'

=============================================================================
2. TERNARY OPERATOR (CONDITIONAL OPERATOR)
=============================================================================

SYNTAX:
  condition ? valueIfTrue : valueIfFalse

KEY POINTS:
- Shorthand for simple if-else statements
- Returns a value, making it perfect for assignments or inline expressions
- Format: (test condition) ? (result if true) : (result if false)
- Best for simple, single-line conditionals
- Can be nested but reduces readability
- Also called the "conditional operator"

EXAMPLE:
  let result = age >= 18 ? "Adult" : "Minor";
  console.log(age > 18 ? "can vote" : "cant vote");

=============================================================================
3. SWITCH STATEMENT
=============================================================================

SYNTAX:
  switch (expression) {
    case value1:
      // code block
      break;
    case value2:
      // code block
      break;
    default:
      // code block
  }

KEY POINTS:
- Tests a single expression against multiple possible values
- Uses STRICT EQUALITY (===) for comparison
- 'case' defines each possible value to match
- 'break' prevents "fall-through" to the next case (IMPORTANT!)
- 'default' executes when no cases match (like 'else' in if-else)
- Without 'break', execution continues to next case (fall-through behavior)
- More efficient than multiple if-else when checking one variable against many values

=============================================================================
4. COMPARISON OPERATORS
=============================================================================

LOOSE EQUALITY (==):
- Compares values with TYPE COERCION
- Example: 5 == "5" returns true (string "5" is converted to number)
- Can lead to unexpected results

STRICT EQUALITY (===):
- Compares both VALUE and TYPE
- Example: 5 === "5" returns false (different types)
- RECOMMENDED: Always use === to avoid bugs

OTHER COMPARISON OPERATORS:
- != (loose inequality) - not equal with type coercion
- !== (strict inequality) - not equal without type coercion
- > (greater than)
- < (less than)
- >= (greater than or equal to)
- <= (less than or equal to)

BEST PRACTICE: Always use === and !== instead of == and !=

=============================================================================
5. LOGICAL OPERATORS
=============================================================================

&& (AND):
- Both conditions must be true
- Example: (age > 18 && age < 65) - true only if both conditions are true
- Short-circuits: if first condition is false, doesn't evaluate second

|| (OR):
- At least one condition must be true
- Example: (age < 18 || age > 65) - true if either condition is true
- Short-circuits: if first condition is true, doesn't evaluate second

! (NOT):
- Inverts/negates the boolean value
- Example: !true returns false, !false returns true
- Example: !isLoggedIn - true if isLoggedIn is false

=============================================================================
WHEN TO USE EACH CONDITIONAL TYPE
=============================================================================

IF-ELSE:
- Complex conditions with different variables
- Range checking (e.g., age > 18 && age < 65)
- Multiple unrelated conditions
- When you need to execute multiple statements

TERNARY OPERATOR:
- Simple conditions with two outcomes
- When you need to assign or return a value
- Inline expressions
- Single-line conditionals for readability

SWITCH:
- Checking one variable against many specific values
- Menu selections, status codes, etc.
- When you have 3+ specific value comparisons
- More readable than multiple if-else for value matching

=============================================================================
*/

let age = 137;

// =============================================================================
// EXAMPLE 1: IF-ELSE STATEMENT
// =============================================================================
// This example demonstrates a multi-branch conditional
// if (age > 18) {
//   console.log("you can vote");  // Executes if age is greater than 18
// } else if (age == 18) {
//   console.log("can vote but u r just a teenager");  // Executes if age equals 18
// } else {
//   console.log("u cant vote");  // Executes if age is less than 18
// }
// NOTE: Using == instead of === is not recommended (loose equality allows type coercion)

// =============================================================================
// EXAMPLE 2: TERNARY OPERATOR
// =============================================================================
// Compact way to write simple if-else: condition ? valueIfTrue : valueIfFalse
// console.log(age > 18 ? "can vote" : "cant vote");
// If age > 18 is true, prints "can vote", otherwise prints "cant vote"

// =============================================================================
// EXAMPLE 3: SWITCH STATEMENT
// =============================================================================
// Tests 'age' against multiple specific values using strict equality (===)
// switch (age) {
//   case 18:
//     console.log("you are 18");  // Executes if age === 18
//     break;  // Prevents fall-through to next case
//   case 19:
//     console.log("you are 19");  // Executes if age === 19
//     break;  // NOTE: Missing semicolon here (should be break;)
//   default:
//     console.log("invalid age");  // Executes if no cases match
// }
// Without 'break', execution would "fall through" to the next case!

// let value="vikas";

// loop(initial;terminal;reference)

// for (let i = 0; i < 10; i++) {
//   console.log(i);
// }

// let arr = [1, 2, 3, 4, 5];

// arr.forEach((ele) => {
//   console.log(ele);
// });

// let obj = {
//   fname: "vikas",
//   lname: "thakur",
// };

// // for (let key in obj) {
// //   console.log(obj[key]);
// // }
// // console.log(Object.entries(obj));

// // Object.freeze(obj);
// Object.seal(obj);
// obj.fname = "akhilesh";
// // obj.salary = 1234;
// console.log(obj);

// =============================================================================
// EXAMPLE 4: STRICT EQUALITY (===) vs LOOSE EQUALITY (==)
// =============================================================================
// let a = 5;      // Number type
// let b = "5";    // String type

// console.log(a === b);  // false - different types (number vs string)
// console.log(a == b);   // would be true - loose equality coerces "5" to 5
// BEST PRACTICE: Always use === to avoid unexpected type coercion bugs!
