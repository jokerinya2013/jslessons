const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

const userId = 'u123';

const user = {
  name: 'Max',
  age: 30,
  hobbies: ['Sports', 'Cooking'],
};

storeBtn.addEventListener('click', () => {
  sessionStorage.setItem('uid', userId);
  localStorage.setItem('user', JSON.stringify(user));
});

retrieveBtn.addEventListener('click', () => {
  const extractedId = sessionStorage.getItem('uid');
  const extractedUser = JSON.parse(localStorage.getItem('user'));
  console.log(extractedUser);
  if (extractedId) {
    console.log('Got the id - ' + extractedId);
  } else {
    console.log('Could not find id.');
  }
});

// Notlar
// key value olarak kaydederiz, kullanıcı bunları değiştirip kendi istediğini kaydedebilir
// sessionStorage sayfa kapanınca silinir, localStorage da ise user, browser yada biz
// tarafından silinmediği sürece kod kalır
