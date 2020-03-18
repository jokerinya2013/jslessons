// const numbers = [1, 2, 3];
// console.log(numbers);

// // const moreNumbers = new Array(3); // (3)=>3 tane boş array yapar.
// // console.log(moreNumbers);

// // const yetMoreNumbers = Array.of(1, 2);
// // console.log(yetMoreNumbers); //nothing special

// const listItems = document.querySelectorAll('li');
// console.log(listItems); //nodelist

// const arrayListItems = Array.from(listItems);
// console.log(arrayListItems); //array

// const hobbies = ['Cooking', 'Sport'];
// const personalData = [30, 'Max', { moreDetail: [] }];

// const analyticsData = [
//   [1, 1.6],
//   [-5.4, 2.1]
// ];

// for (const data of analyticsData) {
//   for (const dataPoints of data) {
//     console.log(dataPoints);
//   }
// }

// console.log(personalData[1]);

// const hobbies = ['Sports', 'Cooking'];
// hobbies.push('Reading');
// hobbies.unshift('Coding');
// const poppedValue = hobbies.pop();
// hobbies.shift();
// console.log(hobbies);
// console.log(poppedValue);

// hobbies[1] = 'Coding';
// hobbies[5] = 'İbrahim';
// console.log(hobbies);
// console.log(hobbies[3]);

// hobbies.splice(1, 0, 'Good Food', 'Leyla');
// // hobbies.splice(0); //hepsini siler (2) 2 den sonrasını siler
// console.log(hobbies);

// const testResults = [1, 5.3, 1.5, 10.99, -5, 10];
// const storedResults = testResults.concat([3.99, 2]);

// testResults.push(5.91);

// console.log(storedResults, testResults);
// console.log(testResults.indexOf(1.5));

// console.log(testResults.includes(10.99)); //true
// console.log(testResults.indexOf(10.99) !== -1); //includes ile aynı işlemi yapar

// const personData = [{ name: 'Max' }, { name: 'Manuel' }];
// console.log(personData.indexOf({ name: 'Manuel' })); //hata yani -1 verir

// const manuel = personData.find((person, idx, persons) => {
//   return person.name === 'Manuel';
// });

// manuel.name = 'Anna';

// console.log(manuel, personData);

// const maxIndex = personData.findIndex((person, idx, persons) => {
//   return person.name === 'Max';
// });

// console.log(maxIndex);

// const prices = [10.99, 5.99, 3.99, 6.59];
// const tax = 0.19;
// const taxAdjustedPrices = [];

// // for (const price of prices) {
// //   taxAdjustedPrices.push(price *(1 + tax));
// // }

// prices.forEach((price, index, prices) => {
//   //index e ulaşım sağlar
//   const priceObj = { index: index, taxAdjPrice: price * (1 + tax) };
//   taxAdjustedPrices.push(priceObj);
// });

// console.log(prices, taxAdjustedPrices);

// map() kullanımı forEach ile farkı array tanımlanmasında, ayrıntı için açıklamalara bak
const prices = [10.99, 5.99, 3.99, 6.59];
const tax = 0.19;

const taxAdjustedPrices = prices.map((price, index, prices) => {
  const priceObj = { index: index, taxAdjPrice: price * (1 + tax) };
  return priceObj;
});

console.log(prices, taxAdjustedPrices);

// sort()

// const sortedPrices = prices.sort((a, b) => {
//   if (a > b) {
//     return 1;
//   } else if (a === b) {
//     return 0;
//   } else {
//     return -1;
//   }
// });
// sorted kısa
const sortedPrices = prices.sort((a, b) => a - b);
// reversed
// console.log(sortedPrices.reverse());
// const sortedPrices = prices.sort((a, b) => b - a);

console.log(sortedPrices);

// NOTLAR
// arraylar zero baseddir yani 0 dan başlar
// Array.from('Hi There!'); // array likedan array yapar ["H", "i", "!"]
// nodelistleri çevirmede yardımcı olabilir
// new Array(3); // (3)=>3 tane boş array yapar.
// Array.of(1, 2);//nothing special
// array içine çok değişik türde bilgiler koyabilirsin
// push sona, unshift başa ekler ve yeni arrayın uzunluğunu return eder
// pop() sondan 1 kaldırır ve kaldırdığı elemanı string olarak return eder
// shift() baştan 1 kaldırır
// shift sağa kaydırır, unshift sola kaydırır gibi düşülmüş isim o yüzden verilmiş
// pop ve push daha hızlıymış
// splice ile iki element arasına öge ekleyebiliriz, sadece array de çalışır, ARRAYLIKE da çalışmaz
// silinmiş olan elamanı return eder
// splice(silinecek el index, kaç eleman silinecek, 'İsteğe bağlı virgül ile ayrılmış insert stringler')
// spliece(-2, 1) sondan ikinci elemanı siler
// array[-2] !!! bu özellik normal  arraylerde çalışmaz
// slice(index, kaç tane istiyorsun) arrayı böler ve yeni array return eder.
// orjinal array durur, array kopyalamak için de kullanılır
// slice(-2, -1) şeklinde kullanılmalı, eksi değerleri seçerken
// concat() pushdan farklı olarak array ekler ve yeni array oluşrurur
//
// reference type da çalışmaz
// indexOf(value) ilk denk gelen indexi verir soldan başlar
// lastIndexOf(value) sağdan başlar, ilk denk gelen indexi verir
// yanlış bulursa -1 verir yanı 0dan küçük değer verir
//
// find(()=>{true}) find ile aranan değer return edildi
// findIndex(()=>{true}) ile aranan değer indexi return edildi
//
// includes=====is part of an index şeklindeki soruya cevap verir
//
// forEach() 3 argument alıyor INDEX'e ulaşmak istediğimizde pratiklik sağlıyor
//
// map() 3 argument alıyor forEach gibi, her elamanı işliyor ve return ediyor. kendisi topluca
// yeni bir array oluşturuyor. const yeniArray = eskiArray.map((item)=>{ return işlemiş item });
// her elemanı işleyin yeni arraye yerleştiriyor. forEach de de her elemanı işleyebiliriz ama öncesinde
// yeniArrayı tanımlamak gerekiyor.map() ile tanımlamdan kullanabiliriz.
// prices.sort((a, b) => a - b); --->> sort
// prices.sort((a, b) => b - a); --->> reverse
