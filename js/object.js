// let obj1 = {};

// let obj2 = new Object();
// obj2.name = "vikas";
// console.log(obj2);

let person = {
  fname: "vikas",
  lname: "thakur",
  age: 26,
  address: {
    city: "delhi",
    country: "India",
  },
};

// let person2 = person;
// let person2 = { ...person };
// // console.log(person2);
// // person2.fname = "akash";
// person2.address.city="Agra"
// console.log(person2);
// console.log(person);

// let person2 = structuredClone(person);
// let person2 = JSON.parse(JSON.stringify(person));
// // person2.address.city = "Agra";
// console.log(person2);
// // console.log(person);

// let arr = ["apple", "mango", "cherry"];
// // let [first, second, ...rest] = arr;
// let [third, ...rest] = arr;
// // console.log(first);
// // console.log(second);
// console.log(third);
// console.log(rest[1]);

// function sum(a, b) {
//   console.log(a + b);
// }
// sum(2, 4);

// function sum(a, b, c, ...args) {
//   let sum = 0;
//   console.log(args);

//   for (let i = 0; i < args.length; i++) {
//     sum = sum + args[i];
//   }
//   return sum;
// }
// let res = sum(2, 4, 4, 5, 67, 8, 543, 2, 456, 788);
// console.log(res);

// let response = {
//   header: {
//     status: 200,
//     author: {
//       fname: "vikas",
//     },
//   },
// };

// let {
//   data: { fname },
// } = response;
// let obj = {
//   fname: "akas",
// };
// // let { fname } = obj;
// console.log(fname);

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
