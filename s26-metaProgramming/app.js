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
// -----------------------------------------------------------------------
// Reflect API
const course = {
  title: 'JS Complete Guide',
};

Reflect.setPrototypeOf(course, {
  toString() {
    return this.title; // course.toString(); yaptığmızda, 'JS Complete Guide' ı verir
  },
});

Object.defineProperty(course, 'duration', { value: 52 });
// bununla aynı işi yapıyor aslında ama meta ölçekli olarak, buradaki tüm
// Default olarak Property Descriptors true olarak alır. (configurable, enumerable, writable)

Reflect.defineProperty(course, 'year', { value: 2019 });
// Default olarak Property Descriptors false olarak alır. (configurable, enumerable, writable)

console.log(course);
// -----------------------------------------------------------------------
// Proxy API

const courseHandler = {
  get(obj, propertyName) {
    console.log(propertyName);
    if (propertyName === 'length') {
      return 0;
    }
    return obj[propertyName] || 'NOT FOUND'; // property ismi yoksa bu çıktıyı ver
    // buraya gelen propertyName string olduğu için
    //  burada obj.propertyName yapamazsın. yaparsan obj."title" yapmaya çalışır hata alırsın
    // o yüzden obj[propertyName] yaptık bunun çıktısı obj["title"] olur
  },
  set(obj, propertyName, newValue) {
    console.log('Sending data....');
    if (propertyName === 'rating') {
      return; // rating i değiştirmek isterse return et, diğerlerini değiştirebilir
    }
    obj[propertyName] = newValue;
  },
};

const pCourse = new Proxy(course, courseHandler);
pCourse.rating = 5; // bunu yukarıda şarttan dolayı yapmayacak.
pCourse.title = 'JaVaScRiPt'; // değişmiş değeri göreceğiz
console.log(pCourse.title, pCourse.length, pCourse.rating); // JaVaScRiPt 0 NOT FOUND

//============================================================================================
// Çok kullanmayacağımız özellikler
// library yazanlar kullanır
// Symbol() primitive dir ve uniqeness sağlar
//
// Reflect API
// Reflect ana methodu ile çalışır.
// Object - Reflect farkı, Reflect daha yeni, hataları belirtiyor
// Reflect de  deletePropery var, Object de yok.
// delete course.title // kullanmak yerine,
// Reflect.deleteProperty(course, 'title') // kullan diyor. bu Boolean döner
//
// Proxy API
// normal objleri değiştirmez, bir nevi get, set gibi çalışır.
//  özelliklere trap denir
