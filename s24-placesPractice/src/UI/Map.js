import L from 'leaflet';

export class Map {
  constructor(coords) {
    // this.coords = coords;
    this.render(coords);
  }

  render(coords) {
    document.getElementById('map').innerHTML = ''; //p tagı temizle

    // open layer ile yaparken
    // const map = new ol.Map({
    //   target: 'map',
    //   layers: [
    //     new ol.layer.Tile({
    //       source: new ol.source.OSM(),
    //     }),
    //   ],
    //   view: new ol.View({
    //     center: ol.proj.fromLonLat([coords.lng, coords.lat]),
    //     zoom: 16,
    //   }),
    // });
    // const layer = new ol.layer.Vector({
    //   source: new ol.source.Vector({
    //     features: [
    //       new ol.Feature({
    //         geometry: new ol.geom.Point(ol.proj.fromLonLat([coords.lng, coords.lat])),
    //       }),
    //     ],
    //   }),
    // });
    // map.addLayer(layer);

    this.map = L.map('map');
    this.map.setView(coords, 15);
    L.tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}',
      {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          'pk.eyJ1Ijoiam9rZXJpbnlhMjAxMyIsImEiOiJjazhzbjh3ZHIwMTl4M2ZsazMzZG44dWU5In0.L5-PUpGg59GgQWBEVFdOXQ',
      }
    ).addTo(this.map);
    // const marker = L.marker(coords).addTo(this.map);
    let marker = L.marker(coords).addTo(this.map);
    marker.bindPopup('<b>Merhaba!</b><br>Ben Buradayım.').openPopup();

    // aşağısı markerın yernini değiştirip koordinatını consola yazıyor. ayrı bir fonk
    // yapılarak kullanılabilir de..
    this.map.on('click', (ev) => {
      marker.removeFrom(this.map);
      marker = L.marker(ev.latlng)
        .addTo(this.map)
        .bindPopup('<b>Merhaba!</b><br>Ben Buradayım.')
        .openPopup();

      const deneme = ev.latlng;
      console.log(deneme);
    });
  }

  update(coords) {
    this.map.remove();
    this.render(coords);
  }
}

// google hesabı aktif olana kadar bundan yapacağız
// In addition to Gitte's answer, for adding a marker on your OpenLayers Map add the following snippet inside render function..
// leaflet ekledim npm install --save leaflet ile
// sonra mapbox dan oturum açtım, ve oradan bir token aldım. sonra bu leaflet css ini ekledim
// en son olarak yukarıdaki code snippetini ekledim
//

//  adress query yapmak için Nomatim sitesini kullancağım
// maps için
// export async function getAddressFromCoords(coords) {
//   return '6th Avenue'; // return any dummy address you want
// }

// export async function getCoordsFromAddress(address) {
//   return {lat: 47.01, lng: 33.55}; // return any dummy coordinates you want
// }

// pk.eyJ1Ijoiam9rZXJpbnlhMjAxMyIsImEiOiJjazhzbjh3ZHIwMTl4M2ZsazMzZG44dWU5In0.L5-PUpGg59GgQWBEVFdOXQ
