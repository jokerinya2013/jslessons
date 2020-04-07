const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

storeBtn.addEventListener('click', () => {
  const userId = 'u123';
  const user = {
    name: 'Max',
    age: 30,
  };
  document.cookie = `uid=${userId}; max-age=180`; // yeni ekler
  document.cookie = `user=${JSON.stringify(user)}`;
});

retrieveBtn.addEventListener('click', () => {
  console.log(document.cookie);
  const cookieData = document.cookie.split(';');
  const data = cookieData.map((el) => el.trim());
  console.log(data[1].split('=')[1]); //user value
});

// Notlar
// dosyadan açılan sayfalarda çalışmaz, local serverdan çalıştırmak gerekir
// eklerken boşluk bırakılmaz
// cookie expritation time konulabilir
// bu ya max-age ile ya da expires ile yapılır
// max-age=5 --->> second alır
