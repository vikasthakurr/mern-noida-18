// var a = 10;

// function double(num) {
//   return num * 2;
// }
// var result1 = double(15);
// console.log(result1);
// var result2 = double(a);
// console.log(result2);
// let a=10;
// console.log(a)

// function sayHi() {
//   console.log("hi");
// }
// console.log(person);

// let person={
//   name:"vikas"
// }

// let salary=13234.23456;
// let salary="vikas"
// let isMarried=false
// let value=undefined;
// let value;
// console.log(typeof value)

// function name(){}
// name()

// let obj={}
// let arr=[]

// let a=10;
// let b=a;
// b=20;
// console.log(b)
// console.log(a)
// let person = {
//   fname: "vikas",
// };
// // let person2 = person;
// // let person2 = { ...person };
// // let person2 = JSON.parse(JSON.stringify(person));
// person2.fname = "akash";
// console.log(person2);
// console.log(person);


//todo
let a=10;
function outer(){
  let a=10;
  console.log(a)
   function inner(){
    console.log(a)

    function inner1(){
      let b=20;
      console.log(a,b)
    }
   }
}

console.log(a,b,a)