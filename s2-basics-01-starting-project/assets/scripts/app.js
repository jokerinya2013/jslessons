const defaultResult = 0;
let currentResult = defaultResult;

currentResult = ((currentResult + 10) * 3) / 2 - 1;
// altgr + , = backtick yapar
// altgr + ? = backslaht yapar
// css de white-space: pre; metni ve boşlukları olduğu gibi gösterir
let calculationDescription = `(${defaultResult} + 10) * 3 / 2 - 1`;
// let errorMessage = 'An error \n' + 'occured!';

outputResult(currentResult, calculationDescription);
