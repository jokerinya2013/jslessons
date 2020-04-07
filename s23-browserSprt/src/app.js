// aşağıdaki özellik tıklayarak kopyalama yaptırıyor
// import 'core-js/features/promise'; // bu şekilde tek olarak ele alabilirsin
//
// { useBuiltIns: 'entry', corejs: { version: 3 } } olarak girersen aşağıdakileri tanımlaman
// gerekir
// import 'core-js/stable';
// import 'regenerator-runtime/runtime';
const button = document.querySelector('button');
const textParagraph = document.querySelector('p');

button.addEventListener('click', () => {
  const text = textParagraph.textContent;
  const promise = new Promise();
  console.log(promise);

  if (navigator.clipboard) {
    navigator.clipboard
      .writeText(text)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    alert('Feature is not available, please copy manually!');
  }
});

// Notlar
// bu özellik, safari ve edge de çalışmıyor.
//
//
// peki let, const, async/await için ne yapmamız gerekiyor, ie da bunlarda çalışmıyor
// cevap transpilation yapmak babel bu iş için var
// npm install --save-dev babel-loader @babel/core @babel/preset-env bu şekilde yükledik
// package.json'a bunu ekledim: "browserslist": ">2%", market sharing i %2nin üstünde olanlara göre
// ayarla demek. başka browser özellikleri için settingi kontrol edebilirsin
//
// polyfill eski browserlarda çalışabilen library kullanmak, fetch API için mesela
// core js ve regenerator-runtime. bunlar pollyfil karşılaştırması yapıyor.
// npm install --save regenerator-runtime ve npm install --save core-js şeklinde yükledik.
// polyfill işlemini babel a yaptıracağız. polyfill i kullan diyeceğiz. config file da ayarlamasını yapıyoruz
//
// https://kangax.github.io/compat-table/es6/ bu site üzerinden özellik karşılaştırması yapıyoruz
//
// sessizce hata yapmaktansa, başka browsera yönlendirmek
// çok daha iyidir diyor. o yüzden mesaj vermek lazım
//
// async ile istersen böyle yapabilirsin
// async function () {
//   const text = textParagraph.textContent;
//   const result = await navigator.clipboard.writeText(text);
//   console.log(result);
// }
//
// slot mantığında çalışır aşağısı.
// <noscript>js kapalıysa aç</noscript>
