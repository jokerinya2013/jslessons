// class Person {
//   name = 'Max';

//   constructor() {
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

const person = new Person();
person.greet();

// Notlar
//  class yeni bir özellik önceden class yokmuş
// function İlkharfibüyük () {} olarak tanımlanıyor ve conventional func tanımlaması yapılıyor
