const addMovieBtn = document.getElementById('add-movie-btn');
const searchMovieBtn = document.getElementById('search-btn');

let movies = [];

const renderMovies = (filter = '') => {
  //filter gelmezse boş olarak tanımla demek
  const movieList = document.getElementById('movie-list');

  if (movies.length === 0) {
    movieList.classList.remove('visible');
    return;
  } else {
    movieList.classList.add('visible');
  }
  movieList.innerHTML = ''; //normalde append ile yapmalı ama burası için böyle yaptı
  // burada filter false ise movies değilse filter yap dedi ki efektiflik için iyi oldu
  const filteredMovies = !filter
    ? movies
    : movies.filter(movie => movie.info.title.includes(filter));

  filteredMovies.forEach(movie => {
    //movie.info[extraName]; bu şekilde ulaşamazsın malesef bu dinamik keye
    const movieEl = document.createElement('li');
    const { info, ...otherProps } = movie; //movie.info demek bu aslında
    console.log(otherProps); // kalan diğer propety leri buna ekler. bu örnek için movie.info var sadece
    // const { title: movieTitle } = info; //info.title lı da tanımlayabiliriz. farklı isim vermek isterserk bu şekilde
    let { getFormattedTitle } = movie;
    getFormattedTitle = getFormattedTitle.bind(movie); //bu şekilde yaparak hatayı önledik
    // let text = getFormattedTitle() + ' - '; // movie.getFormattedTitle() da aynı işlemi yapar aslında
    let text = getFormattedTitle.apply(movie) + ' - '; // movie.getFormattedTitle() da aynı işlemi yapar aslında
    for (const key in info) {
      if (key !== 'title' && key !== '_title') {
        //titleı yukarıda aldık çünkü burada texti belirtiyoruz.
        text = text + `${key}: ${info[key]} `; //dynamic için for in gerekli
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

const addMovieHandler = () => {
  const title = document.getElementById('title').value;
  const extraName = document.getElementById('extra-name').value;
  const extraValue = document.getElementById('extra-value').value;

  if (
    //title check i buradan kaldırdık
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    // info: { title, [extraName]: extraValue }, // title: title , key: value
    info: {
      set title(val) {
        if (val.trim() === '') {
          this._title = 'DEFAULT';
          return;
        }
        this._title = val;
      },
      get title() {
        return this._title;
      },
      [extraName]: extraValue
    },
    id: Math.random().toString(),
    getFormattedTitle() {
      console.log(this); //bu obj e bağlı
      return this.info.title.toUpperCase();
    }
  };

  newMovie.info.title = title; //yukarıda tanımlanmış olan title ı buraya atadık burada set yaptık
  console.log(newMovie.info.title); // burada get yapmış olduk aslında
  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
  console.log(this);
  const searchInput = document.getElementById('filter-title').value;
  renderMovies(searchInput);
};

addMovieBtn.addEventListener('click', addMovieHandler);
searchMovieBtn.addEventListener('click', searchMovieHandler);

// Notlar
// getElemenatById tüm DOM node u verir, input a ulaşmak için value kullan
// AltGr + - ile de pipe sembolü yaparız
// key ile dışarıdan atanan value aynı ise title: title gibi bunu sadece title, yazabiliriz
// yukarıda key ismini ve value yü dinamik yazdırdık
// movie.info[key]; ile dinamik keye ulaşamıyoruz. onun yerine for in loopdan destek aldık
// for indeki for(const key in object) { console.log( object[key])} ---> herbirinin valuesunu verir

// const person2 = {...person}; iki obj bu şekilde bağlanabilir. person.yeni = 32 eklenince diğerini değiştirmezzz
// amaaa ilk atandığında bir array/obj varsa arraya/obj e  ekleme yapıldığında alır,
//  arrayde ->> bunu engellemek için map kullanırız
// objectde ->> const yeni = {...eski, adı: 'ibo', liste: [...yeni.eskiLise]}; bu şekilde önce eskiyi alır sonra üzerine kendi
// bilgilerimizi yazabiliriz yada const yeni = Object.assign({}, eski); yapabiliriz. (Browser support tam olmayabilir)
//
// object destruction da const { keyname } = objname şeklinde kullanıyoruz. array de her isim gelebiliyordu fakat obj
// için ancak key gelebilir. örn : const { info } = movie; //  burada movie.info nun yerine info kullanabiliriz artık
// eğer info da bir obj ise onu da parçalayabiliriz, ve buna yeni isim vermek istersek -const { key: yeniİsim } = obj; -
//
// this. keyword
// functionName.call( , , ,) çeşitli arguments alır, functionName.apply(obj, [agruments]) array olarak alır
//apply ve call başka bir obj de tanımlanmış func ı kullanmaya yarar
// arrow func this i window a bağlar
//
// AŞAĞIDAKİ ÖRNEK SEBEBİYLE ARROW FUNC KULLANILMASI GEREKEN YERLER VAR...
// const person = {
//   adı: 'ibrahim',
//   soyadı: 'şakacı',
//   hobiler: ['Spor', 'Bilgisayar'],
//   yaş() {
//     this.hobiler.forEach(h => {
//       console.log(h + ' ' + this.adı);
//     });
//   }
// }; //spor ibrahim bilgisayar ibrahim verir

// const person2 = {
//   adı: 'ibrahim',
//   soyadı: 'şakacı',
//   hobiler: ['Spor', 'Bilgisayar'],
//   yaş() {
//     this.hobiler.forEach(function(h) {
//       console.log(h + ' ' + this.adı);
//     });
//   }
// }; //spor undefined bilgisayar undefined verir

// yukarıdaki örnek için tanımlanmış bir funtionu başka yerde kullanabilmek için şunu yapabiliriz
// person.yaş.apply(person2); -----> //spor ibrahim bilgisayar ibrahim verir
// person.yaş.call(person2); da aynı sonucu verir
//

// set ve get methodları kullandı
// girilen bir değerin validation ı yapmak için kullanılabilir. paraztez olmadan ulaşım sağlar
// property üretir. set(param){} param almak zorundadır
// deneme = param; şeklinde çağrılır ((( deneme(param) gibi değil yani func farklı olarak)))
// yukarıda bir mantık koymaya çalıştı, sen kendin başka bir mantık kurabilirsin bununla ilgili
// deneme = param; set() yapar..
// deneme; get yapar
