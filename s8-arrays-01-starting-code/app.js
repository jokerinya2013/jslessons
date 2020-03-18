const numbers = [1, 2, 3];
console.log(numbers);

// const moreNumbers = new Array(3); // (3)=>3 tane boş array yapar.
// console.log(moreNumbers);

// const yetMoreNumbers = Array.of(1, 2);
// console.log(yetMoreNumbers); //nothing special

const listItems = document.querySelectorAll('li');
console.log(listItems); //nodelist

const arrayListItems = Array.from(listItems);
console.log(arrayListItems); //array

const hobbies = ['Cooking', 'Sport'];
const personalData = [30, 'Max', { moreDetail: [] }];

const analyticsData = [
  [1, 1.6],
  [-5.4, 2.1]
];

for (const data of analyticsData) {
  for (const dataPoints of data) {
    console.log(dataPoints);
  }
}

console.log(personalData[1]);

// NOTLAR
// arraylar zero baseddir yani 0 dan başlar
// Array.from('Hi There!'); // array likedan array yapar ["H", "i", "!"]
// nodelistleri çevirmede yardımcı olabilir
// new Array(3); // (3)=>3 tane boş array yapar.
// Array.of(1, 2);//nothing special
// array içine çok değişik türde bilgiler koyabilirsin
