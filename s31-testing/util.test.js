// here for async tests
//
//
// jest.mock('./http');
// axios'u eklememize gerek yok mocking için çünkü jest
// node modulesları default olarak ayni isimle dosya varsa mock eder
const { loadTitle } = require('./util');

test('should print an uppercase text', () => {
  loadTitle().then((title) => {
    expect.toBe('DELECTUS AUT AUTEM');
  });
});

// DOM a ve click button a ulaşamadığı için util.js ye fonksiyonu ayırdık
// biz kendi kodumuzu test ederiz. axios u yada diğer 3rd party library değil
