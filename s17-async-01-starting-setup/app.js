const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = opts => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      success => {
        resolve(success); // geolocationın successini, promise in resolve una koyduk
      },
      error => {
        reject(error); // aşağıdaki err mesajı oldu
      },
      opts
    );
  });
  return promise;
};

//  yeni promise yapımı
const setTimer = duration => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done!'); // aşağıda data olarak alacağımız text bu aslında..
    }, duration);
  });
  return promise;
};

async function trackUserHandler() {
  // let positionData;
  let posData, timerData;
  try {
    posData = await getPosition();
    timerData = await setTimer(2000);
  } catch (error) {
    console.log(error);
  }
  console.log(timerData, posData);

  // .then(posData => {
  //   positionData = posData;
  //   return setTimer(2000);
  // })
  // .catch(err => {
  //   console.log(err); // catch ın nereye koyulduğu önemli değildir. hata mesajı verir.
  //   return 'on we go...'; //  kod akışını durdumak için sona koymak gerekir
  // })
  // .then(data => {
  //   console.log(data, positionData); //data bir üst adımdaki return edilen değer oluyor
  // });
  setTimer(1000).then(() => {
    console.log('Timer done!');
  });
  console.log('Getting position...'); // async/await hariç burası her zaman daha önce çalıştırılır
}

// Promise.race([getPosition(), setTimer(1000)]).then(data => {
//   console.log(data);
// }); // en hızlıyı döner.

// Promise.all([getPosition(), setTimer(1000)]).then(promisesData => {
//   console.log(promisesData);
// }); // hepsini döner. hata olursa ilk hatada çıkar ve onu döner

Promise.allSettled([getPosition(), setTimer(1000)]).then(data => {
  console.log(data); // durumlarına göre bir array döner
});

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
//
//promiseYapılmışFunc().then(data=>{return sth}).then(data=>{do ljşljşlkj}) ikinci thendeki
// data ilkinden gelen sth
// catch() yapsını herhangi bir yere koyabiliriz ama akışı durdurmak istiyorsak sona koymalıyız.
// çünkü aksi halde kod akışı ve uygulaması devam eder
//
// async ve await yapısı sadece FUNCTION da kullanılır
// declaration için ---> async function name(){}
// expression için ---> const name = async () =>{} olarak kullanılır
// async eklenir eklenmez function promise return eder
// await herhangi bir PROMİSE önüne eklenir..
// async büyük bir promise oluşturur. func içindeki promiseleri ona dahil eder
// daha kısa kod yazmayı sağlar. error handling olarak eksiktir fakat bunu
// try/catch ile kapatabiliriz. max çok tavsiye etmiyor yine de
//
//
// Promise.race(arrayofpromises).then(fastestpromiseReturingdata) şeklinde çalışır. Sadece
// hızlı dönenle ilgilenir
//

const somePromiseCreatingCode = () => {
  const promise = new Promise((resolve, reject) => {
    resolve();
    reject();
  });
  return promise;
};
somePromiseCreatingCode()
  .then(firstResult => {
    return 'done with first promise';
  })
  .catch(err => {
    // would handle any errors thrown before
    // implicitly returns a new promise - just like then()
  })
  .finally(() => {
    // the promise is settled now - finally() will NOT return a new promise!
    // you can do final cleanup work here
  });

const myButton = document.getElementById('my-button');

const deneme = new Promise((resolve, reject) => {
  resolve({ isim: 'data', yer: 'Promise içi' });
  // setTimeout(() => {}, 2000);
  reject('Olmadı gardaş!');
});

const yaz = () => {
  deneme
    .then(data => {
      // console.log(data.yer, data.isim);
      console.log('Bu yaz Fonksiyonu');
    })
    .catch(err => {
      console.log(err);
    });
};

myButton.addEventListener('click', yaz);

// promise yapısını async uygulama için kullanıyoruz.
// data yapısını kullanmak zorunda değiliz..
// setTimeout u sanki server a ulaşıyormuş gibi bir simülasyon için kullandık.

const otherButton = document.getElementById('my-other-button');

const promiseYap = () => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      success => {
        resolve(success);
      },
      error => {
        reject(error);
      }
    );
  });
  return promise;
};

const consoleYaz = () => {
  promiseYap()
    .then(data => {
      console.log('Pozisyonum: ', data);
    })
    .catch(err => {
      console.log('Hata: ', err.message);
    });
};

otherButton.addEventListener('click', consoleYaz);
// burası normal promise yapısı

const asyncAwaitBtn = document.getElementById('my-aync-button');

const asyncIcınPromiseYap = () => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      success => {
        resolve(success);
      },
      error => {
        reject(error);
      }
    );
  });
  return promise;
};

const asyncIcınConsoleYaz = async () => {
  // asyncIcınPromiseYap()
  //   .then(data => {
  //     console.log('Pozisyonum: ', data);
  //   })
  //   .catch(err => {
  //     console.log('Hata: ', err.message);
  //   });
  // bu şekildeydi.. aşağıdakine çevirdik
  try {
    const konumAsync = await asyncIcınPromiseYap();
    console.log('Pozisyonum: ', konumAsync);
  } catch (error) {
    console.log('Hata: ', error.message);
  }
  console.log('Bunu her halükarda yazar');
};

asyncAwaitBtn.addEventListener('click', asyncIcınConsoleYaz);
