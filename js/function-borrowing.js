let person1 = {
  fname: "vikas",
  age: 26,
  print: function (city) {
    console.log(this.fname, this.age, city);
  },
};
// person1.print();
let person2 = {
  fname: "anil",
  age: 20,
};
//call, apply,bind

// person1.print.call(person2, "agra");
// person1.print.apply(person2,["agra"]);

// person1.print.bind(person2, "agra")();
