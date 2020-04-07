const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

const dbRequest = indexedDB.open('StorageDummy', 1);
let db;

dbRequest.onsuccess = function (event) {
  db = event.target.result;
};

dbRequest.onupgradeneeded = function (event) {
  db = event.target.result; // database açıldı

  const objStore = db.createObjectStore('products', { keyPath: 'id' });

  objStore.transaction.oncomplete = function (event) {
    const productsStore = db
      .transaction('products', 'readwrite')
      .objectStore('products');
    productsStore.add({
      id: 'p1',
      title: 'A First Product',
      price: 12.99,
      tags: ['Expensive', 'Luxury'],
    });
  };
};

dbRequest.onerror = function (event) {
  console.log('ERROR!');
};

storeBtn.addEventListener('click', () => {
  const productsStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');
  productsStore.add({
    id: 'p2',
    title: 'A Second Product',
    price: 122.99,
    tags: ['Expensive', 'Luxury'],
  });
});

retrieveBtn.addEventListener('click', () => {
  const productsStore = db
    .transaction('products', 'readwrite')
    .objectStore('products');
  const request = productsStore.get('p2');

  request.onsuccess = function () {
    console.log(request.result);
  };
});

// Notlar
// file protocol ile de çalışır. enkarışık olanıymış
// keyPath id olarak belirlendiği için, id ile kayıt yaptık
// idb.js isimli bir library var onu kullanabilirsin
