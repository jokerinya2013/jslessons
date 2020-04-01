// NUMBERS
function randomIntBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
console.log(randomIntBetween(1, 10));
// Notlar
// Every number is a floating number in JS
// numbers are holding place of 64 bits
// side note: 1 bit is either 0 || 1 --> 0010 = 4 bits
// Max_Safe_Integer, Max_Value these are the max/min etc. numbers that js can produce
// 0.2 + 0.4 = 0.6000000000000001 but WHY ???
// 0.2 + 0.4 === 0.6 ---> false but WHY???
// (4).toString(2); ---> this one gives binary value of 4 in base-10 which is "100"
// const a = (0.2 + 0.6).toFixed(2); ---> typeof a; --> String
// toFixed() returns a string
// instead use multiply with 10 based numbers. ie: not 20.2, use 20.2*100
// there are certain libraries for this number issues.. we will see..
// in BigInt() we got 2n, 6n and similar numbers. used in bigger numbers
// 1/0; --> Infinity:::>> Infinity is a value
// Number.isNaN(x) --> only checks for x is NaN or not
// Math.abs(-333); --> 333 absolute value, mutlak değer
//
// function randomIntBetween(min, max) adım adım bakalım
// Math.random() + min; minden büyük sayı verir
// Math.random() * (max - min) + min ---> max hariç sayı verir
// Math.floor(Math.random() * (max - min + 1) + min) ---> max ve min dahil sayı verir
//

// STRINGS
function productDescription(strings, productName, productPrice) {
  console.log(strings); // backtick içindeki stringler
  console.log(productName);
  console.log(productPrice);
  //   return 'This is a product!';

  // 1.
  let category = 'pretty cheap regarding its price';
  if (productPrice > 20) {
    category = 'fairly priced';
  }
  //   return `${strings[0]}${prodName}${strings[1]}${category}${strings[2]}`;

  // 2
  return { name: `${productName}`, price: `${productPrice}` };
}

const prodPrice = 29.99;
const prodName = 'JavaScript Course';

const productOutput = productDescription`This product (${prodName}) is ${prodPrice}.`;
console.log(productOutput);

// Strings
// ` ${buradaki expression olmalı}` ---> ya return veren bir function, yada değer
// if kullanamazsın
// `` ile function kullanımda iki yerde faydalanabilirsin.
// 1. değere göre bir yazı dönmede
// 2. stringi obj yapmada
// illa strign return etmek zorunda değilsin diyor

// REGULAR EXPRESSIONS
// validations için bolca kullanılır..
// const regex = /^\S+@\S+\.\S+$/ --> email validationu
// /^ => soldan başl
// \S+ => her türlü kelimeyi kabul ekiyoruz demek
// @ => biryerde @ bulunsun
// \S+ => yine hertürlü kelimeyi kabul ediyoruz
// . => @ dan sonra biryerde . bulunsun
//
// /hello/ için regex.test('hello there') => true olarak döner
//  bu ifadeleri içeren hepsine true verir. case sensetive dır. regex.test('Hello')=>false
// const regex2 = /(h|H)ello/ büyük küçük harf uygun
// const regex2 = /.ello/ ilk karakter önemli değil ello içersin
// google la diyor
// regex2.exec('jşljşljkello') => bilgi içeren bir array veriyor
// new RegExp() ile de tanımlanabilir
