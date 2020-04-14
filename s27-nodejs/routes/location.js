const express = require('express');

const router = express.Router();

const locationStorage = {
  locations: [],
};

// userın gönderdiği
router.post('/add-location', (req, res, next) => {
  const id = Math.random();
  locationStorage.locations.push({
    id: id,
    address: req.body.address,
    coords: { lat: req.body.lat, lng: req.body.lng },
  });
  res.json({ message: 'Stored location!', locId: id });
});

// userın isteği
router.get('/location/:lid', (req, res, next) => {
  const locationId = +req.params.lid; //string geliyor dikkat
  const location = locationStorage.locations.find((loc) => loc.id === locationId);
  if (!location) {
    return res.status(404).json({ message: 'Not found!' });
  }

  res.json({ address: location.address, coordinates: location.coords });
});

module.exports = router; // export ettik

// şu an locationStorage server ımız açık olduğu sürece açık olacak
// Cross-Origin Resource Sharing (CORS)
// ilk başta arraya kaydediyorduk. MondoDB ye kaydedeceğiz
