// 1
const numbers = [1, 3, 6, -7, 9, -1, 0, 12, 3.5, 0.77, 10000];

const filteredNumbers = numbers.filter(num => num > 5);
console.log('filter: ', filteredNumbers); //[6, 9, 12, 10000]

const mappedNumbers = numbers.map((num, index) => ({
  index: index,
  number: num
}));
console.log('map: ', mappedNumbers);

const multipication = numbers.reduce((prev, curr) => prev * curr, 1);
console.log('reduce: ', multipication); //10027.27

// 2
const findMax = array => Math.max(...array);
console.log(findMax(numbers)); //10000

const findMaxAnother = (...array) => {
  array.sort((a, b) => b - a);
  return array[0];
};

console.log(findMaxAnother(...numbers)); //10000

// 3
const findMaxMin = array => {
  const maxValue = Math.max(...array);
  const minValue = Math.min(...array);
  return [minValue, maxValue];
};

const [assin3min, assin3max] = findMaxMin(numbers);
console.log(assin3min, assin3max); //-7 10000

// 4

const myUniqeInfo = new Set([1, 5, 'Deneme', 'Bunlar Tek']);

myUniqeInfo.forEach(a => {
  console.log(a);
});
