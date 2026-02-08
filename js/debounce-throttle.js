// function searchWithDebounce(fn, delay) {
//   let timer;
//   return function (...args) {
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn(...args);
//     }, delay);
//   };
// }

//throttle....

function searchWithThrottle(fn, delay) {
  let Lastcall = 0;
  return function (...args) {
    let currentCall = Date.now();
    if (currentCall - Lastcall >= delay) {
      fn(...args);
      Lastcall = currentCall;
    }
  };
}
function search(name) {
  console.log(`searching for ${name}`);
}

const searchInput = searchWithThrottle(search, 300);
searchInput("vikas");
searchInput("vikas singh");
searchInput("vikas kumar thakur");
