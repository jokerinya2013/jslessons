// BEST CASE: [5] => O(1) (Constant Time Complexity)
// WORST CASE: [3, 5] => O(n)

function getMin(numbers) {
  // [3, 1, 4]
  if (!numbers.length) {
    // 1 execution
    throw new Error('Should not be an empty error');
  }

  let currentMinimum = numbers[0]; // 1 execution

  for (let i = 1; i < numbers.length; i++) {
    // 1 execution
    // number[0] yukarıdan o yüzden 1 den başlar..
    if (numbers[i] < currentMinimum) {
      // 2 execution
      currentMinimum = numbers[i]; // 1 execution
    }
  }

  return currentMinimum; // 1 execution
}
// T = n => Linear Time Complexity => O(n)

// BEST CASE: [1, 3, 5] => O(n^2)
// WORST CASE: [5, 3, 1] => O(n^2)
// AVARAGE CASE: [?, ?, ?] => O(n^2)
function getMin2(numbers) {
  if (!numbers.length) {
    throw new Error('Should not be an empty error');
  }
  // manuel sorting
  for (let i = 0; i < numbers.length; i++) {
    let outerElement = numbers[i];
    for (let j = i + 1; j < numbers.length; j++) {
      let innerElement = numbers[j];

      if (outerElement > innerElement) {
        // swap
        numbers[i] = innerElement;
        numbers[j] = outerElement;

        outerElement = numbers[i];
        innerElement = numbers[j];
      }
    }
  }

  return numbers[0];
}
// Quadratic Time Complexity => n * n => O(n^2)

const testNumbers = [3, 1, 4];
const min = getMin2(testNumbers);
console.log(min);
