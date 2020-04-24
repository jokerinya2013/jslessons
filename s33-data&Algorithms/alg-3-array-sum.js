function sumUp(numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;

  //   return numbers.reduce((pre, cur) => pre + cur, 0);
}
// Linear Time Complexity => O(n)
const array = [1, 2, 5];

console.log(sumUp(array));
