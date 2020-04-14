const express = require('express');
const bodyParser = require('body-parser');

const locationRoutes = require('./routes/location');

const app = express();

app.use(bodyParser.json()); // jsondata gelecek

app.use((req, res, next) => {
  // Cors ile ilgili izin yapıyoruz. * tüm serverlar yapabilir demek
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(locationRoutes);

app.listen(3000);

//    ========================
// |||---------NOTLAR---------|||
//    ========================
// haritalarla ilgili çalışma yapacağız
