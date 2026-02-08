/*
WHAT ARE OBJECTS?
- Objects are collections of key-value pairs (properties and methods)
- Fundamental data structure in JavaScript
- Used to store related data and functionality together
- Keys are strings (or Symbols), values can be any type
- Objects are reference types (stored in heap memory)

WHY USE OBJECTS?
- Group related data and functions together
- Model real-world entities (user, product, order)
- Create structured, organized code
- Enable object-oriented programming
- Pass multiple values through a single parameter

OBJECT CREATION METHODS:
1. Object Literal: let obj = { }
2. Constructor: let obj = new Object()
3. Object.create(): let obj = Object.create(prototype)
4. Class syntax (ES6): class MyClass { }

KEY CONCEPTS:
- Property: Key-value pair in an object (name: "John")
- Method: Function stored as object property
- Dot notation: obj.property
- Bracket notation: obj["property"]
- Nested objects: Objects within objects
- Object reference: Variables hold memory address, not the object itself

*/
/*
 * METHOD 1: Object Literal (Most common and recommended)
 * - Uses curly braces { }
 * - Clean, concise syntax
 */
// let obj1 = {};

/*
 * METHOD 2: Constructor Syntax
 * - Uses 'new Object()'
 * - Less common in modern JavaScript
 * - More verbose than object literal
 */
// let obj2 = new Object();
// obj2.name = "vikas";     // Adding property dynamically
// console.log(obj2);

/*
 * Objects can have:
 * - Simple properties (primitives): fname, lname, age
 * - Nested objects: address contains another object
 * - Methods: functions stored as properties (not shown here)
 */
let person = {
  fname: "vikas", // String property
  lname: "thakur", // String property
  age: 26, // Number property
  address: {
    // Nested object
    city: "delhi",
    country: "India",
  },
};

/*
 * PROBLEM: Objects are reference types
 * - Simply assigning creates a reference, not a copy
 * - Both variables point to the same object in memory
 * - Modifying one affects the other
 */

/*
 * METHOD 1: Reference Assignment (NOT a copy!)
 * ❌ This creates a reference to the same object
 */
// let person2 = person;     // Both point to same object in memory

/*
 * METHOD 2: Spread Operator (Shallow Copy)
 * ✅ Creates a new object with copied properties
 * ⚠️  Only copies one level deep - nested objects are still referenced
 */
// let person2 = { ...person };
// console.log(person2);
// person2.fname = "akash";           // This won't affect person
// person2.address.city = "Agra";     // ⚠️  This WILL affect person! (nested reference)
// console.log(person2);
// console.log(person);               // person.address.city is now "Agra"

/*
 * METHOD 3: Deep Copy (Truly Independent Copy)
 *
 * OPTION A: structuredClone (Modern browsers)
 * ✅ Proper deep cloning
 * ✅ Handles nested objects
 * ✅ Preserves most data types
 */
// let person2 = structuredClone(person);

/*
 * OPTION B: JSON.parse(JSON.stringify())
 * ✅ Deep clones nested objects
 * ❌ Limitations:
 *    - Loses functions
 *    - Loses undefined values
 *    - Loses Symbols
 *    - Converts Date to string
 *    - Cannot handle circular references
 */
// let person2 = JSON.parse(JSON.stringify(person));
// person2.address.city = "Agra";     // ✅ Won't affect original person
// console.log(person2);
// console.log(person);               // person.address.city is still "delhi"

/*
 * Destructuring: Unpacking values from arrays or objects into separate variables
 *
 * ARRAY DESTRUCTURING FEATURES:
 * - Extract values by position (order matters)
 * - Skip elements with empty slots
 * - Use rest operator (...) to collect remaining elements
 */
// let arr = ["apple", "mango", "cherry"];

// Extract first two elements
// let [first, second, ...rest] = arr;
// console.log(first);      // "apple"
// console.log(second);     // "mango"

// Skip elements by leaving empty slots
// let [third, ...rest] = arr;
// console.log(third);      // "apple" (takes first, not index 2)
// console.log(rest[1]);    // "cherry" (second element of rest array)

/*
 * REST PARAMETERS (...args):
 * - Collects multiple arguments into an array
 * - Must be the last parameter
 * - Different from 'arguments' object (not an array)
 * - Works with arrow functions (arguments doesn't)
 */
// function sum(a, b) {
//   console.log(a + b);
// }
// sum(2, 4);

/*
 * Using rest parameters to accept variable number of arguments
 * - First two params are named (a, b, c)
 * - ...args collects all remaining arguments into an array
 */
// function sum(a, b, c, ...args) {
//   let sum = 0;
//   console.log(args);        // Array of remaining arguments
//
//   for (let i = 0; i < args.length; i++) {
//     sum = sum + args[i];
//   }
//   return sum;
// }
// let res = sum(2, 4, 4, 5, 67, 8, 543, 2, 456, 788);
// console.log(res);

/*
 * OBJECT DESTRUCTURING FEATURES:
 * - Extract properties by name (order doesn't matter)
 * - Rename variables during extraction
 * - Set default values
 * - Destructure nested objects
 */
// let response = {
//   header: {
//     status: 200,
//     author: {
//       fname: "vikas",
//     },
//   },
// };

/*
 * Nested destructuring syntax:
 * - Destructure into nested structure
 * - Must match the object's structure
 * ⚠️  This code has an error - should be header, not data
 */
// let {
//   data: { fname },        // ❌ Error: 'data' doesn't exist (should be 'header')
// } = response;

// Correct nested destructuring would be:
// let { header: { author: { fname } } } = response;

// let obj = {
//   fname: "akas",
// };
// let { fname } = obj;     // Extract fname property
// console.log(fname);      // "akas"

/*
 * Common pattern: Destructuring API responses
 * - API returns complex nested objects
 * - Destructuring makes it easy to extract needed data
 * - Improves code readability
 */
let response = {
  id: 2,
  name: "Ervin Howell",
  username: "Antonette",
  email: "Shanna@melissa.tv",
  address: {
    street: "Victor Plains",
    suite: "Suite 879",
    city: "Wisokyburgh",
    zipcode: "90566-7771",
    geo: {
      lat: "-43.9509",
      lng: "-34.4618",
    },
  },
  phone: "010-692-6593 x09125",
  website: "anastasia.net",
  company: {
    name: "Deckow-Crist",
    catchPhrase: "Proactive didactic contingency",
    bs: "synergize scalable supply-chains",
  },
};

/*
 * EXERCISE: Practice destructuring this response object
 * Try extracting:
 * - The user's name
 * - The city from the nested address
 * - The latitude from the deeply nested geo object
 * - The company name
 *
 * EXAMPLES:
 * let { name, email } = response;
 * let { address: { city } } = response;
 * let { address: { geo: { lat, lng } } } = response;
 * let { company: { name: companyName } } = response;
 */

//todo
// link:https://jsonplaceholder.typicode.com/users/

/*
 * OBJECT METHODS AND TECHNIQUES
 *
 * ACCESSING PROPERTIES:
 * - Dot notation: obj.property (preferred, cleaner)
 * - Bracket notation: obj["property"] (dynamic keys, spaces, special chars)
 *
 * CHECKING PROPERTIES:
 * - "key" in obj: Check if property exists
 * - obj.hasOwnProperty("key"): Check own properties (not inherited)
 *
 * ITERATING OBJECTS:
 * - for...in loop: Iterate over all enumerable properties
 * - Object.keys(obj): Get array of keys
 * - Object.values(obj): Get array of values
 * - Object.entries(obj): Get array of [key, value] pairs
 *
 * OBJECT MANIPULATION:
 * - Object.freeze(obj): Prevent adding/removing/modifying properties
 * - Object.seal(obj): Prevent adding/removing properties (can still modify)
 * - Object.assign(target, source): Copy properties from source to target
 * - delete obj.property: Remove a property
 *
 * BEST PRACTICES
 *
 * 1. ✅ Use object literal { } for creating objects
 * 2. ✅ Use destructuring for cleaner code when extracting multiple properties
 * 3. ✅ Use spread operator for shallow copies: { ...obj }
 * 4. ✅ Use structuredClone() for deep copies in modern browsers
 * 5. ✅ Be careful with nested object mutations
 * 6. ✅ Use const for objects (prevents reassignment, properties still mutable)
 * 7. ✅ Prefer dot notation unless you need dynamic keys
 * 8. ⚠️  Remember: Objects are passed by reference, not by value
 *
 */
