// Symbols
// Library land
const uid = Symbol();
console.log(uid);

const user = {
  //   id: 'p1',
  [uid]: 'p1', // const uid nin değerini alır
  name: 'Max',
  age: 30,
  [Symbol.toStringTag]: 'User',
};

user[uid] = 'p3'; // bu şekilde value yu değişterebilirim

// app land => Using the library

user.id = 'p2'; // this should not be possible !

console.log(user[Symbol('uid')]); //undef
console.log(Symbol('uid') === Symbol('uid')); //false
console.log(user.toString());

// Iterators, make sth iteratable..

const company = {
  // curEmployee: 0,
  employees: ['Max', 'Manu', 'Anna'],
  // next() {
  //   if (this.curEmployee >= this.employees.length) {
  //     return { value: this.curEmployee, done: true };
  //   }
  //   const returnValue = { value: this.employees[this.curEmployee], done: false };
  //   this.curEmployee++;
  //   return returnValue;
  // },
  // [Symbol.iterator] bu obj ismi bu olmayınca for loop hata veriyor
  // getEmployee: function* employeeGenerator() {
  [Symbol.iterator]: function* employeeGenerator() {
    let currentEmployee = 0;
    while (currentEmployee < this.employees.length) {
      yield this.employees[currentEmployee];
      currentEmployee++;
    }
  },
};

// let employee = company.next();

// while (!employee.done) {
//   console.log(employee.value);
//   employee = company.next();
// }

for (const employee of company) {
  console.log(employee); // not iterable..
}
console.log([...company]);
// const it = company.getEmployee();

// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next());

//
// Çok kullanmayacağımız özellikler
// library yazanlar kullanır
// Symbol() primitive dir ve uniqeness sağlar
