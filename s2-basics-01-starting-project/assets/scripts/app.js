const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

function getUserNumberInput() {
  // return userInput.value;
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

function calculateResult(calculationType) {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  let mathOperator;
  if (calculationType === 'ADD') {
    currentResult += enteredNumber;
    mathOperator = '+';
  } else if (calculationType === 'SUBTRACT') {
    currentResult -= enteredNumber;
    mathOperator = '-';
  } else if (calculationType === 'MULTIPLY') {
    currentResult *= enteredNumber;
    mathOperator = '*';
  } else if (calculationType === 'DIVIDE') {
    currentResult /= enteredNumber;
    mathOperator = '/';
  }

  if (
    (calculationType !== 'ADD' &&
      calculationType !== 'SUBTRACT' &&
      calculationType !== 'MULTIPLY' &&
      calculationType !== 'DIVIDE') ||
    !enteredNumber // sıfır dışında true döner. Eksi sayılarda bile
  ) {
    return;
  }
  createAndWriteOutput(mathOperator, initialResult, enteredNumber);
  writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}

function add() {
  calculateResult('ADD');
}

function subtract() {
  calculateResult('SUBTRACT');
}

function multiply() {
  calculateResult('MULTIPLY');
}

function divide() {
  calculateResult('DIVIDE');
}

// currentResult = add(1, 2);
// let calculationDescription = `(${defaultResult} + 10) * 3 / 2 - 1`;

// addBtn.addEventListener('click', calculateResult('ADD'));
// bu şekilde yazamayız çünkü parantezli olduğu için ilk önce hesaplama yapar.
// event listener o yüzden PARANTEZSİZ FONK İSMİ ile çağlırılır

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
// script tagı header a koy ve sonuna defer ekle
// googlarken önce javascript yaz sonra birkaç keyword
// birşey araştırırken mdn sitesini kullan
// debugging özelliklerine baktık ve breakpoints ekledik.
// conditionA AND conditionB OR conditionC
// conditionA && conditionB || coditionC yani ya A-B şartı yada C şartı
// çünkü & , || 'dan daha önceliklidir
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
// konu ile ilgili yukarıdaki site ziyaret edilebilir.
// NEGATIVE NUMBERS accepted as true !!!!!
