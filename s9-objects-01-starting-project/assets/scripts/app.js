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
    let text = movie.info.title + ' - ';
    for (const key in movie.info) {
      if (key !== 'title') {
        text = text + `${key}: ${movie.info[key]} `; //dynamic için gerekli
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
    title.trim() === '' ||
    extraName.trim() === '' ||
    extraValue.trim() === ''
  ) {
    return;
  }

  const newMovie = {
    info: { title, [extraName]: extraValue },
    id: Math.random().toString()
  };

  movies.push(newMovie);
  renderMovies();
};

const searchMovieHandler = () => {
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
