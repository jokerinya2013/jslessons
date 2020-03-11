const h1 = document.getElementById('main-title');

h1.textContent = 'Some new title!';
h1.style.color = 'white';
h1.style.backgroundColor = 'black';

const li = document.querySelector('li:last-of-type');
li.textContent = li.textContent + ' (Changed!)';

const body = document.body;

const listItemElements = document.getElementsByTagName('li');
for (const listItemEl of listItemElements) {
  console.dir(listItemEl);
}

//

//NOTLAR
// Browser da $0 en son seçilen elemanı gösterir
// querySelector(), getElementById() tek eleman seçer.
// CSS şeklinde seçer
// Nodes, Elementlerin üst dalıdır.
// querySelector('# yada . kullanmalısın')
// attributes = id, class, value gibi değerlerlere denir.
// querySelector/All bu snapshot alır eğer element ekleme çıkarma yapılırsa güncellemez. başka seçiciler
// kullanmak gerekebilir.
// closest('') ==>> query selector mantığında çalışır.. parent bulmayı sağlar
// childNodes ==>> boşluklu olarak verir o yüzden gelende kullanılmaz
// children, last/firstElementChild gibi kullanımlarda var yada direk query selector de kullanılabilir
// children şeklinde secici kullanmak daha hızlı
