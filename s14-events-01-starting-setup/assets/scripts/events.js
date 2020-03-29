const btns = document.querySelectorAll('button');

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

btns.forEach(btn => {
  btn.addEventListener('mouseenter', clickBtn);
});

window.addEventListener('scroll', event => {
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
