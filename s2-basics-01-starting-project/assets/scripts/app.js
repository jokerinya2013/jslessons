const defaultResult = 0;
let currentResult = defaultResult;

function add() {
  currentResult = currentResult + userInput.value;
  outputResult(currentResult, '');
}

// currentResult = add(1, 2);
// let calculationDescription = `(${defaultResult} + 10) * 3 / 2 - 1`;

addBtn.addEventListener('click', add);
add;
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
