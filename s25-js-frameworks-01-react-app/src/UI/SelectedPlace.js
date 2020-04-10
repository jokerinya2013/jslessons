import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

import './SelectedPlace.css';

const SelectedPlace = (props) => {
  const { centerCoords, fallbackText } = props;
  const mapEl = useRef();

  useEffect(() => {
    if (centerCoords) {
      const map = L.map(mapEl.current); //burada ufak bir hata var
      map.setView(centerCoords, 15);
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
      ).addTo(map);
      // const marker = L.marker(coords).addTo(this.map);
      const marker = L.marker(centerCoords).addTo(map);
      marker.bindPopup('<b>Merhaba!</b><br>Ben Buradayım.').openPopup();
    }
  }, [centerCoords]);

  return (
    <section id="selected-place">
      <div ref={mapEl}>{!centerCoords && <p>{fallbackText}</p>}</div>
    </section>
  );
};

export default SelectedPlace;
