for (let i = 0; i < 500; i++) {
  console.log(Math.random());
}
let dummyArray = [];
for (let i = 0; i < 500; i++) {
  dummyArray.push(Math.random());
}
let dummyObject = {};
for (let i = 0; i < 500; i++) {
  dummyObject[i] = Math.random();
}
let dummyString = "";
for (let i = 0; i < 500; i++) {
  dummyString += Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
let dummyFunction = function() {
  let dummyLocal = Math.random();
  for (let i = 0; i < 500; i++) {
    dummyLocal += Math.random();
  }
  return dummyLocal;
}
for (let i = 0; i < 500; i++) {
  dummyFunction();
}
let dummyLoop = 0;
while (dummyLoop < 500) {
  dummyLoop++;
  console.log(Math.random());
}
let dummyConditional = Math.random();
if (dummyConditional > 0.5) {
  console.log("Condition is true");
} else {
  console.log("Condition is false");
}
let dummySwitch = Math.floor(Math.random() * 10);
switch (dummySwitch) {
  case 0:
    console.log("Case 0");
    break;
  case 1:
    console.log("Case 1");
    break;
  case 2:
    console.log("Case 2");
    break;
  case 3:
    console.log("Case 3");
    break;
  case 4:
    console.log("Case 4");
    break;
  case 5:
    console.log("Case 5");
    break;
  case 6:
    console.log("Case 6");
    break;
  case 7:
    console.log("Case 7");
    break;
  case 8:
    console.log("Case 8");
    break;
  case 9:
    console.log("Case 9");
    break;
  default:
    console.log("Default case");
    break;
}
let dummyTryCatch = function() {
  try {
    let dummyTryCatchLocal = Math.random();
    if (dummyTryCatchLocal > 0.5) {
      throw new Error("Condition is true");
    }
  } catch (error) {
    console.log(error.message);
  }
}
for (let i = 0; i < 500; i++) {
  dummyTryCatch();
}
