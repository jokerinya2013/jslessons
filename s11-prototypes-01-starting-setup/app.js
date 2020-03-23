// class AgedPerson {
//   printAge() {
//     console.log(this.age);
//   }
// }

// class Person extends AgedPerson {
//   name = 'Max';

//   constructor() {
//     super();
//     this.age = 30;
//   }

//   greet() {
//     console.log(
//       'Hi, I am ' + this.name + ' and I am ' + this.age + ' years old.'
//     );
//   }
// }

function Person() {
  this.age = 30;
  this.name = 'Max';
  this.greet = function() {
    console.log(
      'Hi, I am ' + this.name + ' and I am ' + this.age + ' years old.'
    );
  };
}

// Person.prototype = {
//   printAge() {
//     console.log(this.age);
//   }
// };

Person.prototype.printAge = function() {
  console.log(this.age);
};

console.dir(Person);

const p = new Person(); // 1. this = {}, 2. add the obj lines to 'this', 3. return this
p.greet();
p.printAge();
console.log(p.__proto__);
const p2 = new p.__proto__.constructor(); //p ile aynı obji oluşturduk. bire bir aynısı
console.log(p2);

// Notlar
//  class yeni bir özellik önceden class yokmuş
// function İlkharfibüyük () {} olarak tanımlanıyor ve conventional func tanımlaması yapılıyor
// ilk harfin büyük olması önemli değil önemli olan new ile tanımlama kısmı
// new şunu yapar 1. this = {}, 2. add properties to empty obj , 3. return this
// __proto__ tüm objectlerde olur fakat prototype sadece functionlarda olur
// prototype a yeni fonk eklenebilir
