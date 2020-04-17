import { initProducts } from './product-management';

function addProduct(event) {
  import('./product-management.js').then((mod) => {
    mod.addProduct(event);
  });
} // lazy loading için ekledi..

const addProductForm = document.getElementById('new-product');

initProducts();

addProductForm.addEventListener('submit', addProduct);

// ================================================================
// ............Aşağıyı çalışmak için öylesine ekledim............\\
// ================================================================

// const myBtn = document.getElementById('deneme');

// async function sendData() {
//   try {
//     const data = await fetch('https://map-location-trail.herokuapp.com/add-location', {
//       method: 'POST',
//       body: JSON.stringify({
//         address: 'Deneme başka yerden',
//         lat: 0,
//         lng: 0,
//       }),
//     });
//     const res = await data.json();
//     console.log(res);
//   } catch (err) {
//     (err) => {
//       console.log(err);
//     };
//   }
// }

// myBtn.addEventListener('click', sendData);

//
// async function sendData() {
//   try {
//     const data = await fetch(
//       'https://map-location-trail.herokuapp.com/location/5e9707b31c9d4400008af62d'
//     );
//     const res = await data.json();
//     console.log(res);
//   } catch (err) {
//     (err) => {
//       console.log(err);
//     };
//   }
// }
