const postTemplate = document.getElementById('single-post');
const listElement = document.querySelector('.posts');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('#available-posts ul');

function sendHttpRequest(method, url, data) {
  const promise = new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url);

    xhr.responseType = 'json'; // burası olduğu için parse yapmaya gerek yok

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 300) {
        //200ler başarılı demek
        resolve(xhr.response); // çünkü gelen data bu
      } else {
        reject(new Error('Something went wrong'));
      }
    };

    xhr.onerror = function() {
      reject(new Error('Failed to send request')); // request failure
    };

    xhr.send(JSON.stringify(data)); // network->headers ın içinde gözlemleriz
  });

  return promise;
}

// .then den async e çevirdik, try catch koymadık ama nedense
async function fetchPosts() {
  try {
    const responseData = await sendHttpRequest(
      'GET',
      'https://jsonplaceholder.typicode.com/pos'
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

  sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
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
