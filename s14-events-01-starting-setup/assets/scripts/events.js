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
