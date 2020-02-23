const defaultResult = 0;
let currentResult = defaultResult;

function getUserNumberInput() {
  return parseInt(userInput.value);
}
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
}

function add() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult = currentResult + enteredNumber;
  createAndWriteOutput('+', initialResult, enteredNumber);
}

function subtract() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult = currentResult - enteredNumber;
  createAndWriteOutput('-', initialResult, enteredNumber);
}

function multiply() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult = currentResult * enteredNumber;
  createAndWriteOutput('*', initialResult, enteredNumber);
}

function divide() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult = currentResult / enteredNumber;
  createAndWriteOutput('/', initialResult, enteredNumber);
}

// currentResult = add(1, 2);
// let calculationDescription = `(${defaultResult} + 10) * 3 / 2 - 1`;

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);

//
// Notlar...
//
// altgr + , = backtick yapar
// altgr + ? = backslaht yapar
// css de white-space: pre; metni ve boşlukları olduğu gibi gösterir
// let errorMessage = 'An error \n' + 'occured!'; line break yapar
// functions name(){} şeklinde tanımlananlar tanımlanmadan önce kullanılabiir
// return sonrası kodlar iptal edilir
// addEventListener() iki parameter alır, ilki str ikincisi fonks ama sadece adı parentez yok
// parentez koymadaki mantık, js yukarıdan aşağı kodu okurken git ve o fonk çalıştır demek
// ama bazı durumlarda bunu yapmasını istemeyiz. bu yüzden sadece adını yazarız,
// bir tetikleyici olduğunda uygula deriz.
// input olarak girilen her değer STRING dir. Ama Vue de v-model düzenler...
// parseInt = STR =>> Int, parseFlo = Str =>> Floating Number
// currentResult = currentResult + parseInt(userInput.value); aşağıdaki gibi de olabilir
// currentResult = currentResult + +userInput.value; kısa versiyonu çok kullanılmaz
