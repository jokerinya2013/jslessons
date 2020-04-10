export async function getCoordsFromAddress(address) {
  const myAddress = address;
  const uri = encodeURI(`https://nominatim.openstreetmap.org/search/${myAddress}?format=json`);

  const data = await fetch(uri);
  const responseArray = await data.json();
  console.log(responseArray[0]);
  if (!responseArray || responseArray.length === 0) {
    throw new Error('!Failed to fetch coordinates, Please try again');
  }

  const coordinates = { lat: responseArray[0].lat, lng: responseArray[0].lon };
  return coordinates;
}

export async function getAddressFromCoords(coord) {
  const data = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coord.lat}&lon=${coord.lng}`
  );
  // response json oluyor
  const response = await data.json();
  console.log(response.display_name);
  const address = response.display_name;
  return address;
}

// google maps kullanamadığım için nominatim kullandım
// encodeURI kullandık, bu UTF-8 haline çeviriyor yazıyı

//
