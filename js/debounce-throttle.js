/*

WHAT ARE DEBOUNCING AND THROTTLING?
- Performance optimization techniques
- Control how often a function executes
- Prevent excessive function calls
- Improve browser performance and user experience
- Essential for handling frequent events (scroll, resize, input)

WHY DO WE NEED THEM?
- Some events fire very frequently (hundreds of times per second)
- Examples: scroll, mousemove, window resize, keypress
- Running expensive operations on each event can freeze the browser
- Network requests on every keystroke waste bandwidth
- Debouncing and throttling reduce function execution frequency

THE PROBLEM:
Without optimization:
- User types "hello" → 5 API calls (h, he, hel, hell, hello)
- User scrolls → 100+ scroll event handlers executed
- Window resize → Dozens of expensive calculations

With optimization:
- Debounce: Wait until user stops typing, then make 1 API call
- Throttle: Execute scroll handler at most once every 200ms

*/
/*
 * WHAT IS DEBOUNCING?
 * - Delays function execution until after a specified quiet period
 * - Resets the timer if the function is called again before the delay expires
 * - Only executes once after the user stops the action
 *
 * HOW IT WORKS:
 * 1. User triggers event (e.g., types a character)
 * 2. Timer starts (e.g., 300ms)
 * 3. If user triggers again before timer expires → Cancel previous timer, start new one
 * 4. If timer completes without interruption → Execute the function
 *
 * REAL-WORLD EXAMPLE - Search Box:
 * User types: h → e → l → l → o
 * - Without debounce: 5 API calls (h, he, hel, hell, hello)
 * - With debounce (300ms): 1 API call after user stops typing (hello)
 *
 * COMMON USE CASES:
 * - Search input (autocomplete)
 * - Form validation
 * - Auto-save functionality
 * - Window resize calculations
 * - Text input processing
 *
 * IMPLEMENTATION:
 */
// function searchWithDebounce(fn, delay) {
//   let timer;                          // Stores the timer ID
//   return function (...args) {         // Return wrapper function
//     clearTimeout(timer);              // Cancel previous timer
//     timer = setTimeout(() => {        // Start new timer
//       fn(...args);                    // Execute function after delay
//     }, delay);
//   };
// }

/*
 * WHAT IS THROTTLING?
 * - Ensures a function executes at most once in a specified time interval
 * - Ignores calls made within the interval
 * - Guarantees regular execution at a fixed rate
 *
 * HOW IT WORKS:
 * 1. User triggers event (e.g., scrolls)
 * 2. Function executes immediately
 * 3. Start cooldown period (e.g., 300ms)
 * 4. Ignore all calls during cooldown
 * 5. After cooldown, next call will execute
 *
 * REAL-WORLD EXAMPLE - Infinite Scroll:
 * User scrolls continuously for 3 seconds
 * - Without throttle: 300+ scroll handlers executed
 * - With throttle (200ms): 15 handlers executed (once every 200ms)
 *
 * COMMON USE CASES:
 * - Infinite scrolling (load more content)
 * - Button click prevention (avoid double-clicks)
 * - Mouse movement tracking
 * - Window scroll events
 * - API rate limiting
 * - Game loop functions (limit FPS)
 *
 * THROTTLING vs DEBOUNCING:
 * - Debounce: Waits for quiet period (no calls for X ms)
 * - Throttle: Executes regularly at fixed intervals (every X ms)
 */

/*
 * THROTTLE IMPLEMENTATION:
 * - Track the timestamp of the last execution
 * - Compare current time with last execution time
 * - Only execute if enough time has passed (delay elapsed)
 */
function searchWithThrottle(fn, delay) {
  let Lastcall = 0; // Timestamp of last execution
  return function (...args) {
    // Return wrapper function
    let currentCall = Date.now(); // Current timestamp in milliseconds
    if (currentCall - Lastcall >= delay) {
      // Check if enough time has passed
      fn(...args); // Execute the function
      Lastcall = currentCall; // Update last execution time
    }
    // If not enough time has passed, the call is ignored
  };
}

// Example function to be throttled
function search(name) {
  console.log(`searching for ${name}`);
}

/*
 * Create throttled version of search function
 * - Will execute at most once every 300ms
 * - If called 3 times in quick succession:
 *   1. First call executes immediately
 *   2. Second and third calls are ignored (within 300ms window)
 */
const searchInput = searchWithThrottle(search, 300);
searchInput("vikas"); // ✅ Executes (first call)
searchInput("vikas singh"); // ❌ Ignored (called within 300ms)
searchInput("vikas kumar thakur"); // ❌ Ignored (called within 300ms)
// Only "searching for vikas" will be logged
