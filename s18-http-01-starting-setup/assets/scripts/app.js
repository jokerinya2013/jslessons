const postTemplate = document.getElementById('single-post');
const listElement = document.querySelector('.posts');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('#available-posts ul');

function sendHttpRequest(method, url, data) {
  // const promise = new Promise((resolve, reject) => {
  // const xhr = new XMLHttpRequest();
  // xhr.setRequestHeader('Content-Type', 'application/json'); // header böyle ekleniyor
  // xhr.open(method, url);
  // xhr.responseType = 'json'; // burası olduğu için parse yapmaya gerek yok
  // xhr.onload = function() {
  //   if (xhr.status >= 200 && xhr.status < 300) {
  //     //200ler başarılı demek
  //     resolve(xhr.response); // çünkü gelen data bu
  //   } else {
  //     reject(new Error('Something went wrong'));
  //   }
  // };
  // xhr.onerror = function() {
  //   reject(new Error('Failed to send request')); // request failure
  // };
  // xhr.send(JSON.stringify(data)); // network->headers ın içinde gözlemleriz
  // });
  // return promise;

  // fetch API
  // fetch(url); -->sadece url ile göndermek get requesti yapar. gelen bilgi stremed bilgidir
  return fetch(url, {
    method: method,
    // body: JSON.stringify(data), // json olmalı
    body: data
    // headers: {
    //   'Content-Type': 'application/json' //data type ı servere söylüyoruz
    // }
  })
    .then(response => {
      // response.text()--> text e  ulaştırır; response.blob()--> file a ulaştırır
      if (response.status >= 200 && response.status < 300) {
        return response.json(); //--> js yapar ve bu da bir promise dir
      } else {
        return response.json().then(errData => {
          console.log(errData);
          throw new Error('Something went wrong-server side');
        });
      }
    })
    .catch(error => {
      // aynı XMLHttpRequest te olduğu gibi burayada request failureda gelir
      console.log(error);
      throw new Error('Something went wrong-server side');
    });
}

async function fetchPosts() {
  try {
    const responseData = await sendHttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/posts'
    );
    //   const listOfPosts = JSON.parse(responseData);
    const listOfPosts = responseData;
    for (const post of listOfPosts) {
      const postEl = document.importNode(postTemplate.content, true); // içeriği kopyaladık
      postEl.querySelector('h2').textContent = post.title.toUpperCase(); // bu içerikten p'yi seçiyoruz
      postEl.querySelector('p').textContent = post.body; // bu içerikten p'yi seçiyoruz
      postEl.querySelector('li').id = post.id; // li e id ekledik
      listElement.append(postEl); // içeriği içine koyuyoruz
    }
  } catch (error) {
    alert(error.message);
  }
}

// bu yapı jsonplaceholder daki yer ile aynı kurulmak durumunda
async function createPost(title, content) {
  const userId = Math.random();
  const post = {
    title, //title: title
    body: content,
    userId
  };

  // formData yapacağız
  const fd = new FormData(form); // yukarıdaki cost form 'u ekledik
  // aşğıdaki gibi bireyssel olarak da ekleyebiliriz yada topluca da ekleyebiliriz
  // hmtl de formun name attribute u muhakkak olmalı
  // fd.append('title', title);
  // fd.append('body', content);
  fd.append('userId', userId);
  // fd.append('someFile', 'photo path', 'photo.png (ismi yani)'); // dosya ekleyebiliriz

  sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', fd);
  // sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
  console.log(post);
}

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', event => {
  event.preventDefault();
  // const enteredTitle = form.querySelector('#title'); //ben mal gibi böyle yaptım doğrusu şu
  const enteredTitle = event.currentTarget.querySelector('#title').value;
  const enteredContent = event.currentTarget.querySelector('#content').value;

  createPost(enteredTitle, enteredContent);
});

postList.addEventListener('click', event => {
  if (event.target.tagName === 'BUTTON') {
    // hayati nokta tagName kontrolü idi.
    const postId = event.target.closest('li').id;
    sendHttpRequest(
      'DELETE',
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
  }
});

//

// Notlar
// jsonplaceholder kullanacağız https://jsonplaceholder.typicode.com/
// request is  XMLHttpRequest VERY GOOD BROWSER SUPPORT
// JSON= JS Object Notation
// .responseType = 'json'; eklersen parse etmene gerek olmaz
// OOP için kodu güncelledik
// promise kullanacağız,
// form içinde preventDefault kullandık..
//
// tüm işlemlerde jsonplaceholder.com ın data yapısı ve methodlarına uygun davrandık
//
// her bir elemana bir event listener koymaktansa daha uygun olan yöntemi yapacağız
// xhr.error otomatik olarak ortaya koymaz, gelen hata raporunu da bir response olarak kabul eder
// ancak response request edemediği durumlarda uyarı verir.
// bu yüzden xhr.error u response u check ederek koyuyoruz
//
// fetch Api ile yapacağız şimdi de
// fetch() bir fonksiyondur ve promise içinde kullanır. bu yüzden direk onu return edeceğiz
// fetch(url) -> bu direk get yapar
// fetch(url, obj).then(response) şeklindedir.
// fetch(url, {method:'POST/GET .. VS.', data: JSON Olmak zorunda})
//
// Headers ekstra bilgi demek önemli olabilir
//
// formdata diye bir tür de var iletmek için very popular diyor değiştireceğiz
// çok iyi dosya ekleyebiliriz.
// otomatik olarak form u parse etmesini de sağlayabiliriiz bunu yaparken serverin beklediği
// isimleri html de name attribute u olarak eklememiz gerekir

// aşağısı .then ile kullanımı
// function fetchPosts() {
//   sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts').then(
//     responseData => {
//       //   const listOfPosts = JSON.parse(responseData);
//       const listOfPosts = responseData;
//       for (const post of listOfPosts) {
//         const postEl = document.importNode(postTemplate.content, true); // içeriği kopyaladık
//         postEl.querySelector('h2').textContent = post.title.toUpperCase(); // bu içerikten p'yi seçiyoruz
//         postEl.querySelector('p').textContent = post.body; // bu içerikten p'yi seçiyoruz
//         listElement.append(postEl); // içeriği içine koyuyoruz
//       }
//     }
//   );
// }

// fetchPosts();
