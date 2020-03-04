// let name = 'Max';

// if (name === 'Max') {
//   let hobbies = ['Sports', 'Cooking'];
//   console.log(hobbies);
// }

// function greet() {
//   let age = 30;
//   let name = 'Manuel'; //shadow yapıyor
//   console.log(name, age, hobbies);
// }
// console.log(name, hobbies);
// greet();

function getName() {
  return prompt('Your name: ', '');
}

function greet() {
  const name = getName();
  console.log('Hello ' + name);
}

greet();

// varda object içinde tanımlanmış olmasına rağmen hobbiese ulaşırız. func içindeyse ulaşamayız
// heap -->
// stack -->
