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
// stack --> kısa süreli mesela bir func çağrıldığında devreye giriyor
// ÇOK ÖNEMLİİİİ
// PRIMITIVE = String, number, boolean, null, undefined, symbol (Normalde Stackte)
// PRIMITIVE = yeniden atamada değeri değiştirmez. çünkü ilkinde değer atanır sadece
// REFERENCE = Tüm Object ler (Heap de. pointer koyar) biri değişince diğeri de değişir
// REFERENCE let hobbies = ['Sports']; let yetHobbies = [...hobbies]; şeklinde tanımlanırsa, ayrı bir tanımlama yapar
// yani yukarıdaki gibi Reference type yapmaz
// Bir fark daha
// const person1 = {'enes'}; const person2 = {'enes'};  person1===person2 // output false
