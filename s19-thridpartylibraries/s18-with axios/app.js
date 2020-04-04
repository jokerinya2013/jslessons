const postTemplate = document.getElementById('single-post');
const listElement = document.querySelector('.posts');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('#available-posts ul');

async function fetchPosts() {
  try {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/posts'
    );
    const listOfPosts = response.data;
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
    userId,
  };

  // formData yapacağız
  const fd = new FormData(form); // yukarıdaki cost form 'u ekledik
  // aşğıdaki gibi bireyssel olarak da ekleyebiliriz yada topluca da ekleyebiliriz
  // hmtl de formun name attribute u muhakkak olmalı
  // fd.append('title', title);
  // fd.append('body', content);
  fd.append('userId', userId);
  // fd.append('someFile', 'photo path', 'photo.png (ismi yani)'); // dosya ekleyebiliriz

  const response = await axios.post(
    'https://jsonplaceholder.typicode.com/posts',
    fd
  ); // FormData ve obj konulabilir. axios bunları uygun formata çevirir ve header ekler
  console.log(response);
}

fetchButton.addEventListener('click', fetchPosts);
form.addEventListener('submit', (event) => {
  event.preventDefault();
  // const enteredTitle = form.querySelector('#title'); //ben mal gibi böyle yaptım doğrusu şu
  const enteredTitle = event.currentTarget.querySelector('#title').value;
  const enteredContent = event.currentTarget.querySelector('#content').value;

  createPost(enteredTitle, enteredContent);
});

postList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    // hayati nokta tagName kontrolü idi.
    const postId = event.target.closest('li').id;
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${postId}`);
  }
});

//

// Notlar
// axios u cdn olarak eklediğimiz için her yerde kullanabiliriz
// promise yapısını kullandığı için promisify etmeye gerek yoktur
// return eden response obj olduğu için kullanıma hazırdır
// axios.get/.post/.put/.delete(url, data) --> yapar
// FormData ve obj konulabilir. axios bunları uygun formata çevirir ve header ekler
// hatada alert ile uyarı verir
