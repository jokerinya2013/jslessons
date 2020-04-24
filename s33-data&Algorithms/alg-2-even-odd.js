function isEvenOrOdd(number) {
  return number % 2 ? 'Odd' : 'Even'; //return number % 2 === 0 ? 'Even' : 'Odd';
}
// Constant Time Complexity => O(1)
console.log(isEvenOrOdd(10)); // 'Even'
console.log(isEvenOrOdd(11)); // 'Odd'
