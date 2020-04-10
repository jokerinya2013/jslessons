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
const coords = {
  lat: parseFloat(queryParams.get('lat')),
  lng: +queryParams.get('lng'),
}; // burada string gelecek bunu iki şekilde num yapabiliriz. yukarıda ikisi de var
const address = queryParams.get('address');
new LoadedPlace(coords, address);

// önce classı tanımladık sonra coordinatı ve adressi ilettik
