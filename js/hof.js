// let arr = [12, 3, 3, 45, 5];

// arr.forEach((ele) => {
//   console.log(ele);
// });

// arr.map((ele) => {
//   console.log(ele * 2);
// });
// console.log(arr);
let salary = [100, 200, 300, 400];
let salary2 = [400, 600, 1000];
function calculateTen(salary) {
  return salary * 0.1;
}

function twentyPercent(salary) {
  return salary * 0.2;
}

// function calculateTax(salary, cb) {
//   let res = [];
//   for (let i = 0; i < salary.length; i++) {
//     res.push(cb(salary[i]));
//   }
//   return res;
// }

Array.prototype.calculateTax = function (cb) {
  let res = [];
  for (let i = 0; i < this.length; i++) {
    res.push(cb(this[i]));
  }
  return res;
};

// console.log(calculateTax(twentyPercent));
console.log(salary2.calculateTax(calculateTen));
