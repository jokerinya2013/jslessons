const movieList = document.getElementById('movie-list');

movieList.style['background-color'] = 'red';
// movieList.style.backgroundColor = 'red';
movieList.style.display = 'block';

const userChosenName = 'level';

const person = {
  name: 'İbrahim',
  'first name': 'Max',
  age: 30,
  hobbies: ['sports', 'cooking'],
  [userChosenName]: '...', //key level olur
  greet: function() {
    alert('Hi There!');
  },
  1.5: 'hello'
};

// console.log(person.something); //undefined

// person.age = 31;
delete person.age;
// person.age = undefined;
// person.age = null
person.isAdmin = true;

const keyName = 'first name';

// console.log(person.name, person['first name']);
console.log(person.name, person[keyName]); // key 'first name' oldu
console.log(person[1.5]);
console.log(person);

// NOTLAR
// ekleme ve olmayan elamana ulaşma
// Olmayan bir elemana ulaşmaya çalışınca hata vermez. console.log(person.evli) -> undefined
// bu olmayan elamanı tüm obj içinde göstermez
// yeni property i de bu saye direk atayabiliriz. person.sınav = 100 gibi
// silme: delete ile yapılır. person.age = undefined diye sakın atama, undefinedı bilg atar.
// person.age = null ile yaparsan, obj içinde age keyini null olarak görmeye devam edersin
//
// key isimleri string de olabilir. bunlara ulaşmak için objName['keyName'] kullanabilirsin.
// movieList.style['background-color'] = 'red'; bu şekilde veya
// movieList.style['backgroundColor'] = 'red'; bu şekilde kullanabiliriz
// bu sayede sayıları dahi key yapabiliriz. 1.5 : 'hello' -> person[1.5] -----> //hello
//
// keylerin hepsi sayıdan oluşursa bu durumda object sort edilir
// array gibi düşün sonuçta arrayda bir object ve keyi 0dan başlayıp devam eden sayılar.
//
// string cotation ile dynamic olarak const store edebiliriz
