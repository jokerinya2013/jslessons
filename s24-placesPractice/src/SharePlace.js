import { Modal } from './UI/Modal';
import { Map } from './UI/Map';
import { getCoordsFromAddress, getAddressFromCoords } from './Utility/Location';

class PlaceFinder {
  constructor() {
    const adressForm = document.querySelector('form');
    const locateUserBtn = document.getElementById('locate-btn');
    this.shareBtn = document.getElementById('share-btn');

    locateUserBtn.addEventListener('click', this.locateUserHandler.bind(this)); //aşağıda arrow func kullandığımız için bind kullandık
    this.shareBtn.addEventListener('click', this.sharePlaceHandler);
    adressForm.addEventListener('submit', this.findAddressHandler.bind(this));
  }

  // sharing
  sharePlaceHandler() {
    // clipboard desteği var mı kontrol ediyoruz
    const sharedLinkInputElement = document.getElementById('share-link');
    if (!navigator.clipboard) {
      sharedLinkInputElement.select(); // ilgili elemanın içindekileri seçer
      return;
    }
    // clipboarda kopyala
    navigator.clipboard
      .writeText(sharedLinkInputElement.value)
      .then(() => {
        alert('Copied into clipboard!');
      })
      .catch((err) => {
        console.log(err);
        sharedLinkInputElement.select(); // ilgili elemanın içindekileri seçer
      });
  }

  // map
  selectPlace(coordinates, address) {
    // daha önce map açılmış mı onu kontrol et demek
    // map ı coorinates ile render ediyoruz
    if (this.map) {
      this.map.update(coordinates);
    } else {
      this.map = new Map(coordinates);
    }
    //nodejs bölümünde ekledik, json formatına getirmek ve keyleri doğru girmek önemli

    fetch('http://localhost:3000/add-location', {
      method: 'POST',
      body: JSON.stringify({
        address: address,
        lat: coordinates.lat,
        lng: coordinates.lng,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const locationId = data.locId; //server 3000 den gelecek.location.jsden
        this.shareBtn.disabled = false;
        const sharedLinkInputElement = document.getElementById('share-link');
        sharedLinkInputElement.value = `${location.origin}/my-place?location=${locationId}`;
      });

    // input a adres ve coordinate bilgisi yazıyor
    // yukarıya taşıdık
    // this.shareBtn.disabled = false;
    // const sharedLinkInputElement = document.getElementById('share-link');
    // sharedLinkInputElement.value = `${location.origin}/my-place?address=${encodeURI(address)}&lat=${
    //   coordinates.lat
    // }&lng=${coordinates.lng}`;
  }

  // get my location
  locateUserHandler() {
    if (!navigator.geolocation) {
      alert('Location feature is not available in your browser - please use a modern browser.');
      return;
    }
    const modal = new Modal('loading-modal-content', 'Loading location - please wait!');
    modal.show();
    navigator.geolocation.getCurrentPosition(
      async (successResult) => {
        const coordinates = {
          lat: successResult.coords.latitude,
          lng: successResult.coords.longitude,
        };
        const address = await getAddressFromCoords(coordinates);
        modal.hide();
        this.selectPlace(coordinates, address);
      },
      (error) => {
        modal.hide();
        alert('Could not locate you unfortunately. Please enter an address manually!');
      }
    );
  }

  // find with address
  async findAddressHandler(event) {
    event.preventDefault();
    const address = event.target.querySelector('input').value; // event.target form oluyor. yukarıda form submit olduğu için
    if (!address || address.trim().length === 0) {
      alert('Invalid adress entered - please try again.');
      return;
    }

    const modal = new Modal('loading-modal-content', 'Loading location - please wait!');
    modal.show();

    try {
      const coordinates = await getCoordsFromAddress(address);
      this.selectPlace(coordinates, address);
    } catch (error) {
      alert(error.message);
    }

    modal.hide();
  }
}

new PlaceFinder();

// Notlar
// placefinder classını ekleyerek başladık.
// userlocation işlemi ile devam ettik,  geolocation kullanımı uygun
// modal eklemek için Modal.js i ekledik. kodu oraya ayırdık.
// import ederken .js koyma webpack ekleyecek onu
//
// google maps platform u ekleyeceğiz, google maps sdk ile arayıp, google platforms a girdik
//
// google maps ekleyemedim, leaflet mapbox ve nomatim kullandım.
// program şu mantıkla çalışıyor
// bir buton ile konumu buluyor(navigator API ile coordinat alıyor buradan Location js den address i getiriyor)
// arama butonu ile addressten konumu buluyor (Location js vasıtasıyla yine yapıyor bunu)
// doğal olarak her ikisinde de hem address hem coordinate bilgisi oluyor elimde.
// set ile hem haritayı coordinata göre düzenliyor hem de input a bilgileri yazıyoruz
// encodeURI method unu kullanmak önemli
// clipboarda kopyalanan kodu CTRL - V ile url ye yapıştırıyoruz. olay bu
//
