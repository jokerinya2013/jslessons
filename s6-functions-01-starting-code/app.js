const startGameBtn = document.getElementById('start-game-btn');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const DEFAULT_USER_CHOICE = 'ROCK';

let gameIsRunning = false;

const getPlayerChoice = function() {
  const selection = prompt(
    `${ROCK}, ${PAPER} or ${SCISSORS}?`,
    ''
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice! We chose ${DEFAULT_USER_CHOICE} for you!`);
    return DEFAULT_USER_CHOICE;
  }
  return selection;
};

startGameBtn.addEventListener('click', function() {
  if (gameIsRunning) {
    return;
  }
  gameIsRunning = true;
  console.log('Game is starting...');
  const playerSelection = getPlayerChoice();
  console.log(playerSelection);
});

// Notlar
// object içindeki func lara method denir
// argument function deneme('Max') --> Max ==> argument
//  parameter function deneme(name) --> name ==> parametre
// function lar objectlerdir
// function diye başlayarak belirtince declaration olur
// declarations: her yerde tanımlanıp kullanılabilir.
// bir değişkene atanırsa bu kez expression olur const start = function start(){}; gibi
// expressionlar tanımlanmadan önce kullanılamaz. Max bunu tavsiye ediyor
//
//
// const start = function() {
//   // expression
//   console.log('Game is starting...');
// };

// const person = {
//   greet: function greet() {
//     //şu anda bu method deniyor buna
//     console.log('Hello there!');
//   }
// };

// person.greet();

// console.dir(startGame);
