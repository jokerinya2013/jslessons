const fs = require('fs'); // file system

fs.readFile('user-data.txt', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data.toString());
});

fs.writeFile('user-data.txt', 'username=ibrahim', (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Wrote to file!');
  }
});

//    ========================
// |||---------NOTLAR---------|||
//    ========================
// NodeJs bilgisayarda dahi çalışabilir
// ilgili dosya konumunda terminal den node a ulaşabilirsin
// node app.js ile çalıştırırsın
// bazı özellikler bulunmadığı için onları import etmen gerekir
// docslar: https://nodejs.org/api/
// import için require kullanılır
