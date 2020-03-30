const btn = document.querySelector('button'); //ilk button

const clickBtn = event => {
  // event.target.disabled = true; // tıkladığımızı  disabled yap.
  // event.path[0].style.cursor = 'not-allowed'; // bunu ben ekledim
  console.log(event);
};

const clickBtn2 = () => {
  console.log('Nbr!');
};

// btn.onclick = clickBtn;
// btn.onclick = clickBtn2; //sadece bunu çalıştırır..

// const bndFunc = clickBtn.bind(this); // bind ile kullanım da bu şart

// setTimeout(() => {
//   btn.removeEventListener('click', clickBtn);
// }, 2000);

// btns.forEach(btn => {
//   btn.addEventListener('mouseenter', clickBtn);
// });

// window.addEventListener('scroll', event => {
//   console.log(event);
// });

const form = document.querySelector('form');

form.addEventListener('submit', event => {
  event.preventDefault();
  console.log(event);
});

const div = document.querySelector('div');

div.addEventListener('click', event => {
  console.log('Dıv');
  console.log(event);
}); // true olursa bunu çalıştırır

btn.addEventListener('click', event => {
  event.stopPropagation(); // div yazmaz, divin başka yerlerine basınca yazmaya devam eder
  console.log('btn');
  console.log(event);
});

const listItems = document.querySelectorAll('li');
const list = document.querySelector('ul');
// burası max in çözümü. benden yarı yarıya daha az kod kullanmış
// listItems.forEach(listItem => {
//   listItem.addEventListener('click', event => {
//     event.target.classList.toggle('highlight');
//   });
// });

// burasını ben yaptım çok şükür. burada tek tek tüm elemanlara event lis eklendi
// const liItems = document.querySelectorAll('li');
// const addColor = event => {
//   let bgColor = event.target.style.backgroundColor;
//   if (bgColor === 'red') {
//     event.target.style.backgroundColor = 'white';
//   } else {
//     event.target.style.backgroundColor = 'red';
//   }
// };
// for (const li of liItems) {
//   li.addEventListener('click', addColor.bind(li));
// }

list.addEventListener('click', event => {
  // console.log(event.currentTarget); // bu ul yi seçiyor
  // event.target.classList.toggle('highlight'); // tıklanılan en küçük elemanı seçer
  event.target.closest('li').classList.toggle('highlight'); // ul içinde hangi elemana tıklanırsa en yakın li seçer
  // hatta li tıklansa da kendisini seçer
  benimBtn.click(); // btn ye uygulanmış olan event lis ı çalıştırabiliriz
}); //ul e uygulanmış olmasına rağmen, bubbling den dolayı event target olarak li ı alır

// bunu event e bakmak için ben koydum
const benimBtn = document.getElementById('benim');
benimBtn.addEventListener('click', event => {
  console.log('benim buton', event);
});
//
// Notlar
// section-14 Events
// html de kullanılan "onclick" oldukça eski bir kullanım
// <button onclick="alert('Mrb!');">Click me</button> bu şekilde bir kullanımı var
//
// diğerinde func tanımlanıp btn.onclick = functionName; şeklinde bir kullanımı var
// bunu yapınca birden fazla func atayamıyoruz. atanmış olan en son func çalıştırıyor
// ayrıca remove event listener gibi bir durumda yok o yüzden kullanma
//
// click, dbclick, contextmenu= bu sağ click demek!
//
// element.removeEventListener(trigger, functionName)---> 2 öge alır biri trigger diğeri atanmış functiondır
// peki ya atanmış func anonomous func ise??? ---> bu durumda bir çözüm yok. func tanımlayıp ismiyle kullancaksın
// funcName.bind(this) --> burada da remove even listener yaparken bindli ifadeyi const ile tanımlayıp öyle
// kullanmak gerekiyor
//
// form içindeki button da bilgileri server a göndermeye çalışıyor, yeniden yüklüyor,
// bu yüzden event listeneri form a atayabiliriz.
// tüm elemanlarda isim.preventDefault() kullanabiliriz
//
// capturing event listenerin dıştan içe gelmesi, bubbling içten dışa gitmesi.
// yani button/div/section a event lis eklendiyse default olarak bu önce button dakini çalıştırır.
// ama bu değiştirilebilir. addEventListener(trigger, func, Boolean) --> Boolean default olarak false
// eğer true alırsa Capturing e döner ve dıştan içe uygular.
// tüm bu olaylara PROPAGATION denir. event.stopPropagation() ile bu zincirleme event dışındakiler engellenir
// mouseenter, drag bubling yapmaz o yüzden stopPropagation yapmaya gerek yoktur.
//
// list itemlara birden fazla event lis eklemek sıkıntılı olabilir
// bunun daha efektif bir yolu var. ul ' e event lis eklenmesine rağmen li ı event.target olarak
// kabul eder. yani tıklama ile event.target ı lowest possible element olarak alır.
// karmaşık yapılarda bu sıkıntılı olabilir. örn li içince h2/div/p falan varsa. tıklanılan elemanı alır
// bunun için closest() kullanabiliriz. element.closest('hedef element ismi') eğer kendisini bulmak istiyorsak
// kendisini de seçer. mesela li.closest('li'); kendisini seçer. bu uygulamaya event delegation denir
//
// click()  submit() ile event lis ları programatically çağırabiliriz
//
// event lis de arrow function da "this" window 'u temsil eder
// fuction keyword ile tanımlanmışlarda "this" currentTarget'ı temsil eder. yani event lis atandığı elemanı
