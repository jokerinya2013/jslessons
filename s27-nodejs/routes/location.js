const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const router = express.Router();

const url =
  'mongodb+srv://jokerinya2013:mhZBx2SLdBLVz6bX@cluster0-2z02b.mongodb.net/locations?retryWrites=true&w=majority'; //clusterdaki url

const client = new MongoClient(url);

const locationStorage = {
  locations: [],
};

// userın gönderdiği
router.post('/add-location', (req, res, next) => {
  client.connect(function (err, client) {
    const db = client.db('locations');

    // Insert a single document, id yi kendisi ekliyor, locations db altında bir userlocation ekliyorum
    // id yi kendisi yüklese de bunun formatı farklı, aşağıda get yaparken bunu halledeceğiz
    db.collection('user-locations').insertOne(
      {
        address: req.body.address,
        coords: { lat: req.body.lat, lng: req.body.lng },
      },
      function (err, r) {
        console.log(r);
        res.json({ message: 'Stored location!', locId: r.insertedId });
      }
    );
  });
});

// burayı yukarıya dbase taşıdık artık
// const id = Math.random();
// locationStorage.locations.push({
//   id: id,
//   address: req.body.address,
//   coords: { lat: req.body.lat, lng: req.body.lng },
// });

// userın isteği, bu 3000 üzerinde hizmet verdiği için
// http://localhost:3000/location/ şeklinde yazmaya gerek yok
router.get('/location/:lid', (req, res, next) => {
  const locationId = req.params.lid; //string geliyor dikkat(arrayde kullanırken)
  client.connect(function (err, client) {
    const db = client.db('locations');

    // Insert a single document, id yi kendisi ekliyor, locations db altında bir userlocation ekliyorum
    db.collection('user-locations').findOne(
      {
        _id: new mongodb.ObjectId(locationId), // id formatı str den farklı olduğu için çevirdik
      },
      function (err, doc) {
        if (!doc) {
          return res.status(404).json({ message: 'Not found!' });
        }
        res.json({ address: doc.address, coordinates: doc.coords });
      }
    );
  });
});
// mongodb e bağladık, bunu kaldırdık, burası array e bağlı olan
// const location = locationStorage.locations.find((loc) => loc.id === locationId);
// if (!location) {
//   return res.status(404).json({ message: 'Not found!' });
// }

module.exports = router; // export ettik

// şu an locationStorage server ımız açık olduğu sürece açık olacak
// Cross-Origin Resource Sharing (CORS)
// ilk başta arraya kaydediyorduk. MondoDB ye kaydedeceğiz
// mongodb de oturum açtık
// cluster oluşturduk
// yetki verdik ve ip koyduk
// mongodb nodejs driver ı yükleyeceğiz,
// npm install mongodb --save ile yükledik, CRUD operations a bakacağız
// bunun tutorialları---> https://mongodb.github.io/node-mongodb-native/3.6/tutorials/crud/
// mongodb+srv://jokerinya2013:<password>@cluster0-2z02b.mongodb.net/test?retryWrites=true&w=majority
// bunu kopyalayıp getirdik, password u değiştirdik ve test yazan yere kendi databasemizin ismini koyduk
//
