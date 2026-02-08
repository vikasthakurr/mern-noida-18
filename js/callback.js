//callback -> call+later
// function A(b->process)

// function sayHi(name, cb) {
//   setTimeout(() => {
//     console.log(`hi ${name}`);

//   }, 10000);
// }

// function sayBye() {
//   console.log("bye");
// }

// sayHi("akhilesh", sayBye);
// sayBye();

function makeMaggi(raw, cb) {
  console.log("start making maggi");
  cb();
}

function waterBoil(cb) {
  console.log("water boiled add magii and masala");
  cb();
}

function serve(cb) {
  console.log("maggi ready for serve");
  cb();
}

// makeMaggi("yapee", () => {
//   waterBoil(() => {
//     serve(() => {
//       console.log("maggii process is done");
//     });
//   });
// });

//todo
//make a process for sandwich making

function makeSandwich(bread, cb) {
  console.log(` make a ${bread} sandwich`);
  // cb();
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
function serve(cb) {
  console.log("serve");
  cb();
}

// makeSandwich(
//   "brown",
//   applySauce("spicy"),
//   stuffing("paneer"),
//   grilled(),
//   serve(),
// );

// makeSandwich("brown", () => {
//   applySauce("spicy", () => {
//     stuffing("paneer", () => {
//       grilled(() => {
//         serve(() => {
//           console.log("sandwich done please eat it");
//         });
//       });
//     });
//   });
// });
