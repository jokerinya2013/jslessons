const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

function getUserNumberInput() {
  return parseInt(userInput.value);
}
// Genereates and Writes Calculation log TO HTML PARTS
function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription); // from vendor file
}

function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  newResult
) {
  const logEntry = {
    oparation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: newResult
  };
  logEntries.push(logEntry);
  console.log(logEntry.oparation);
  console.log(logEntries);
}

function add() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult += enteredNumber;
  createAndWriteOutput('+', initialResult, enteredNumber);
  writeToLog('ADD', initialResult, enteredNumber, currentResult);
}

function subtract() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult -= enteredNumber;
  createAndWriteOutput('-', initialResult, enteredNumber);
  writeToLog('SUBTRACT', initialResult, enteredNumber, currentResult);
}

function multiply() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult *= enteredNumber;
  createAndWriteOutput('*', initialResult, enteredNumber);
  writeToLog('MULTIPLY', initialResult, enteredNumber, currentResult);
}

function divide() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult /= enteredNumber;
  createAndWriteOutput('/', initialResult, enteredNumber);
  writeToLog('DIVIDE', initialResult, enteredNumber, currentResult);
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
