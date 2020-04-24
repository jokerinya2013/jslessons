const age = [30, 29, 54];

// adding
age.push(60); // =>Constant Time Complexity O(1);
age.unshift(10); // => Linear Time Complexity O(n)
// removing
age.pop(); // =>Constant Time Complexity O(1);
age.shift(); // => Linear Time Complexity O(n)

const myAge = age[1]; // =>Constant Time Complexity O(1);

// ===========================================

const namePopularity = [
  { username: 'max', usages: 5 },
  { username: 'manu', usages: 6 },
];

const manuUsages = namePopularity.find((pers) => pers.username === 'manu').usages;
// BEST CASE: => O(1) (Constant Time Complexity)
// WORST CASE:  => O(n) Linear Time Complexity
// AVERAGE CASE:  => O(n) Linear Time Complexity

const nameMap = {
  max: 5,
  manu: 6,
};

const manuUsages2 = nameMap['manu']; // => O(1) (Constant Time Complexity)

// https://adrianmejia.com/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/

// https://adrianmejia.com/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/

// https://adrianmejia.com/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/

// https://github.com/trekhleb/javascript-algorithms
