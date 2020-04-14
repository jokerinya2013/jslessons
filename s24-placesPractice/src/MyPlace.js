import { Map } from '../src/UI/Map';
class LoadedPlace {
  constructor(coordinates, address) {
    new Map(coordinates);
    const headerTitle = document.querySelector('header h1');
    headerTitle.textContent = address;
  }
}

const url = new URL(location.href); //urldeki bilgileri getir
const queryParams = url.searchParams; // key-value şeklinde ? den sonraki bilgileri alır
// urlden bilgiyi çekip, diğer bilgileri backend den getireceğiz..
// const coords = {
//   lat: parseFloat(queryParams.get('lat')),
//   lng: +queryParams.get('lng'),
// }; // burada string gelecek bunu iki şekilde num yapabiliriz. yukarıda ikisi de var
// const address = queryParams.get('address');
const locId = queryParams.get('location');
fetch('http://localhost:3000/location/' + locId)
  .then((response) => {
    if (response.status === 404) {
      throw new Error('Could not find location!');
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    new LoadedPlace(data.coordinates, data.address);
  })
  .catch((err) => {
    alert(err.message);
  });

// önce classı tanımladık sonra coordinatı ve adressi ilettik
