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
  cb()
}

makeMaggi("yapee", () => {
  waterBoil(() => {
    serve(() => {
      console.log("maggii process is done");
    });
  });
});
