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
