const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const RESULT_DRAW = 'DRAW';
const RESULT_PLAYER_WINS = 'PLAYER_WINS';
const RESULT_COMPUTER_WINS = 'COMPUTER_WINS';

const DEFAULT_USER_CHOICE = ROCK;

let gameIsRunning = false;

const getPlayerChoice = () => {
  const selection = prompt(
    `${ROCK}, ${PAPER} or ${SCISSORS}?`,
    ''
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!`);
    return;
  }
  return selection;
};

const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE) =>
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;

// if (cChoice === pChoice) {
//   return RESULT_DRAW;
// } else if (
//   (cChoice === ROCK && pChoice === PAPER) ||
//   (cChoice === PAPER && pChoice === SCISSORS) ||
//   (cChoice === SCISSORS && pChoice === ROCK)
// ) {
//   return RESULT_PLAYER_WINS;
// } else {
//   return RESULT_COMPUTER_WINS;
// }

startGameBtn.addEventListener('click', () => {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log('Game is starting...');
  const playerChoice = getPlayerChoice();
  const computerChoice = getComputerChoice();
  let winner;
  if (playerChoice) {
    winner = getWinner(computerChoice, playerChoice);
  } else {
    winner = getWinner(computerChoice, playerChoice);
  }
  let message = `You picked ${playerChoice ||
    DEFAULT_USER_CHOICE}, computer picked ${computerChoice}, therefore you `;
  if (winner === RESULT_DRAW) {
    message += 'had a draw.';
  } else if (winner === RESULT_PLAYER_WINS) {
    message += 'won.';
  } else {
    message += 'lost.';
  }
  alert(message);
  gameIsRunning = false;
});
//
// not related to game
// arrow function da rest opretatörü
// bu 3 nokta diğerinden farklı bu parametreleri merge ederek array oluşturur
// rest operator denir bu özelliğe

const combine = (resultHandler, operation, ...numbers) => {
  // a ve b yi ilk alır kalanı numbers olara array yapar
  const validateNumber = number => {
    return isNaN(number) ? 0 : number;
  };
  let sum = 0;
  for (const num of numbers) {
    if (operation === 'ADD') {
      sum += validateNumber(num);
    } else {
      sum -= validateNumber(num);
    }
  }
  // return sum;
  resultHandler(sum);
  // kendi callback functionumuzu yaptık
};

const showResult = (messageText, result) => {
  alert(messageText + ' ' + result);
};

//  normalde function keyword ile tanımlamada rest operatörü 'arguments' olarak kullanılır
// ama string olarak aldığı için uygun değil

// const subtractUp = (resultHandler, ...numbers) => {
//   let sum = 0;
//   for (const num of numbers) {
//     //dont use diyor
//     sum -= num;
//   }
//   resultHandler(sum);
// };
// console.log(sumUp(1, 2, 3, 4, 'hgfghf', 5));
// console.log(subtractUp(1, 2, 3, 4, 5));

combine(
  showResult.bind(this, 'The result after adding all numbers is '),
  'ADD',
  1,
  2,
  3,
  4,
  'hgfghf',
  5
);
combine(
  showResult.bind(this, 'The result after subtracting all numbers is '),
  'SUBTRACT',
  1,
  2,
  3,
  4,
  5
);
//kendi callback functionumuzu yaptık
//
//
//
// Notlar
// object içindeki func lara method denir
// argument function deneme('Max') --> Max ==> argument
//  parameter function deneme(name) --> name ==> parametre
// function lar objectlerdir
// function diye başlayarak belirtince declaration olur
// declarations: her yerde tanımlanıp kullanılabilir.
// bir değişkene atanırsa bu kez expression olur const start = function start(){}; gibi
// expressionlar tanımlanmadan önce kullanılamaz. Max bunu tavsiye ediyor
// aşağıdaki şekillerde yazılabilirler
// () => {...}
// arg => {...}
//(a, b) => a + b
// (a, b) => {a *= 2; return a+b;}
//
// const person = {
//   greet: function greet() {
//     //şu anda bu method deniyor buna
//     console.log('Hello there!');
//   }
// };

// person.greet();
// const sayHello5 = (name, greeting = 'Merhaba') => console.log(greeting+' '+name);
// sayHello5('Ibo');
// Default değer olarak greeting 'Merhaba' alır. Eğer atama yapılmazsa.. en kolay
// tanımlama yolu budur
//
// Callback function yaptım
//
// const checkInput = (cb, ...inputs) => {
//   const validateString = input =>
//   !input || typeof input !== 'string' ? 'Invalid input' : input;
// let allInputs = [];
// for (const input of inputs) {
//   allInputs.push(validateString(input));
// }
// cb(allInputs);
// };

// const deneme = all => console.log(all);
// checkInput(deneme, 'lşkjşlkj', 'lşjkş', 0, 2);
//
// bir callback functionda değeri kullanmak için bind() kullanmak gerekiyor.
// bind(this, ) en az iki argument alıyor. birincisi this diğerlerin istenilernler
// kullanıldığı fonksiyondaki ilk parametreler olarak işlem görürler
