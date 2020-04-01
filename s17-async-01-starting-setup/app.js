const button = document.querySelector('button');
const output = document.querySelector('p');
//  yeni promise yapımı
const setTimer = duration => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!'); // aşağıda data olarak alacağımız text bu aslında..
    }, duration);
  });
  return promise;
};

function trackUserHandler() {
  navigator.geolocation.getCurrentPosition(
    posData => {
      setTimer(2000).then(data => {
        console.log(data, posData);
      });
    },
    error => {
      console.log(error);
    }
  );
  setTimer(1000).then(() => {
    console.log('Timer done!');
  });
  console.log('Getting position...'); // burası her zaman daha önce çalıştırılır
  // diğerleri ne kadar hızlı olursa olsunlar farketmez
}

button.addEventListener('click', trackUserHandler);

// let result = 0;
// burası kodu kitliyor.
// for (let i = 0; i < 10000000; i++) {
//   result += i;
// }

// console.log(result);
//
// Notlar
// JS is single threaded lang, that means it does one task at one time..
// recursion a bir örnek kattım
// navigator.geolocation.getCurrentPosition ile pozisyon bilgisi aldık
// async code, sync code dan daha sonra çalışır
// stack akışı kavramı önemli
//
// promises aslında async kodu daha okunaklı kılmak için ortaya çıkmış bir kavram
// bu arada tüm async funclarda Promise yapısını kullanamayız. örn setTimeout ve getCurrentPosition()
// new Promise(func(resolve, reject)) constructor func çalıştırmak üzere iki deger alan bir func alır
// isimleri genelde resolve ve reject olur ama istersen başka isimde verebilirsin
