const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs'); // templateden sorumlu bu olsun diyoruz.ejs i yükledik
app.set('views', 'views'); // set('views', 'dosya_ismi')

app.use(bodyParser.urlencoded({ extended: false })); // buradaki türü yazarken header türüne göre getirir ancak..
// FormData için bu formatı kullanıyoruz..

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  next();
});

app.use((req, res, next) => {
  const userName = req.body.username || 'Unknown User';
  const entryOk = userName === 'Enes' ? 'You have authority' : '';
  res.render('index', {
    user: userName,
    entryOk: entryOk,
  });
});

app.listen(3000);

//    ========================
// |||---------NOTLAR---------|||
//    ========================
// express olarak import ettiğimiz şey aslında bir function
// app e atayıp kullanmaya başladık.
// sıra önemli.. app.use() lara middleware deniyor
// en sonuncuya kadar next() kullanmalıyız
// gelen request i parse eden bir package kullanmalıyız. bu işimizi çok kolaylaştırır
// npm install body-parser --save şeklinde yükleriz
// html template dosyası yükleyip bunu dynamic şekilde şekillendireceğiz
// npm install --save ejs ile yükledik
// yukarıda app.set ile özelliklerini tanımlayıp, views klasörü içine bir index.ejs
// dosyası oluşturduk, buradan bilgileri karşılaştırabiliyoruz.
// şimdi daha önce hazırladığımız harita uygulamasında bunu kullanacağız.
