const ul = document.body.firstElementChild.nextElementSibling;
const firstLi = ul.firstElementChild;

const section = document.querySelector('section');
const button = document.querySelector('button');

section.className = 'red-bg';

button.addEventListener('click', () => {
  // if (section.className === 'red-bg visible') {
  //   section.className = 'red-bg invisible';
  // } else {
  //   section.className = 'red-bg visible';
  // }
  // yukarıdakinin daha kolay yolu
  section.classList.toggle('invisible');
});

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
// children, nextElement şeklinde secici kullanmak queryden daha hızlı
// nodes olanları seçersek boşlukları sayıyor ona dikkat etmek gerekiyor
// className  tüm classları manüpüle eder
// classList classları secerek mapüle etmeyi sağlar
// classList.toggle , .contains, .add, .remove gibi func lar alır
// div.insertAdjacentHTML('4 konumdan biri', 'ekleyeceğim HTML kodu')
// bu yaklaşım sayfanın yenilenmesini engeller
// div.insertAdjacentHTML('beforeend', '<p>Yanlış giriş</p>') ==>> en sona ekler
// const newLi = document.crateElement('li') yanlızca documentte çalışır.
// ul.appendChild(newLi) şeklinde ekleriz
// ul.append ise node şeklinde ekler (IE de çalışmaz)
// ul.prepend en başa ekler (IE de çalışmaz)
// li.insertBefore() bu çalışır IE de
// li.after(element) ve li.before(element) da var (IE ve safari de çalışmaz)
// bu yüzden insertAdjacentElement ('beforeend', '<p>Yanlış giriş</p>') kullan
//  bunu.replaceWith(bununla) demek :)
//  const dth = div.cloneNode(true yada false alır) değişkene atayabilirsin
