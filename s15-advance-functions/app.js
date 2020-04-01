// pure function
function add(num1, num2) {
  return num1 + num2;
}
console.log(add(1, 5)); // 6
console.log(add(12, 15)); // 27

// impure function
function addRandom(num1) {
  return num1 + Math.random();
}
console.log(addRandom(5));

// side-effect function
let previousResult = 0;
function addMoreNumbers(num1, num2) {
  const sum = num1 + num2;
  previousResult = sum; //side effect
  return sum;
}
console.log(addMoreNumbers(1, 5));

const hobbies = ['Sports', 'Cooking'];

function printHobbies(h) {
  h.push('NEW HOBBY'); // side effect
  console.log(h);
}
printHobbies(hobbies);

// factory function & closures
let multipilier = 1.1;
function createTaxCalculator(tax) {
  function calculateTax(amount) {
    console.log(multipilier);
    return amount * tax * multipilier;
  }

  return calculateTax; // functionı dönüyoruz
}
const calculateVatAmount = createTaxCalculator(0.19);
const calculateIncomeTaxAmount = createTaxCalculator(0.25);

console.log(calculateVatAmount(100));
console.log(calculateVatAmount(200));

let userName = 'Max';
function greetUser() {
  // let name = 'Anne'; // içerideki değerin önceliği vardır
  console.log('Hi ' + name);
}

let name = 'Afra';

userName = 'ibrahim'; // son değiştirilen değeri alır

greetUser();

// recursion

// function powerOf(x, n) {
//   let result = 1;

//   for (let i = 0; i < n; i++) {
//     result *= x;
//   }
//   return result;
// } // normalde bu şekilde ama daha kısa yolu da var

function powerOf(x, n) {
  // if (n === 1) {
  //   return x;
  // }
  // return x * powerOf(x, n - 1);

  return n === 1 ? x : x * powerOf(x, n - 1); // kısa yazılışı
}

console.log(powerOf(2, 3)); // 8

// Recursion complicated usage VERY IMPORTANT
const myself = {
  name: 'Max',
  friends: [
    {
      name: 'Manuel',
      friends: [
        {
          name: 'Chris',
          friends: [
            {
              name: 'Ali',
              friends: [
                {
                  name: 'zeynep'
                }
              ]
            }
          ]
        }
      ]
    },
    { name: 'Julia' }
  ]
};

function getFriendNames(person) {
  const collectedNames = [];

  if (!person.friends) {
    return []; //person un arkadaşı yoksa geri dön demek.. empty array dönmesi önemli
  }

  for (const friend of person.friends) {
    collectedNames.push(friend.name); // ilk bi ismi al bakayım..
    collectedNames.push(getFriendNames(friend)); // diğer itemın yanına bu fonksu tekrarla
  }

  return collectedNames;
}

console.log(getFriendNames(myself));

// ["Manuel", "Chris", "Ali", "zeynep", "Julia"]

// Notlar
// side effect olmayan func kullanmaya çalış
// factory func için func içinde func kullanmak demektir aslında
// Actually every function in javascript is a CLOSURE
//  recursion ====> yineleme
// çok önemli data yinelemelerinde, exit conditionu muhakkak koymak lazım..

const jokerinya = {
  isim: 'ibro',
  arkadasları: [
    {
      isim: 'Afra',
      arkadasları: [
        {
          isim: 'Esra'
        },
        {
          isim: 'Azra',
          arkadasları: [
            {
              isim: 'Leyla'
            }
          ]
        }
      ]
    },
    {
      isim: 'muhammed',
      arkadasları: [
        {
          isim: 'furkan'
        },
        {
          isim: 'zehra'
        }
      ]
    }
  ]
};

function arkadaslarıGetir(şahıs) {
  const toplananİsimler = [];

  if (!şahıs.arkadasları) {
    return []; // şahıs arkadaşları falsy ise boş arrayı dönmek önemli
  }

  for (const arkadas of şahıs.arkadasları) {
    toplananİsimler.push(arkadas.isim);
    toplananİsimler.push(...arkadaslarıGetir(arkadas));
  }

  return toplananİsimler;
}

console.log(arkadaslarıGetir(jokerinya));
//  ["Afra", "Esra", "Azra", "Leyla", "muhammed", "furkan", "zehra"]

// Recursiona bir bir ek daha
const ali = {
  name: 'ali',
  arkadaş: [
    {
      name: 'kemal',
      arkadaş: [
        {
          name: 'suzan',
          arkadaş: [
            {
              name: 'emel',
              arkadaş: [
                {
                  name: 'kamil'
                },
                { name: 'ali' }
              ]
            }
          ]
        }
      ]
    }
  ]
};

function findFriends(eleman) {
  const arkadaşlar = [];
  if (!eleman.arkadaş) {
    return [];
  }

  for (const bro of eleman.arkadaş) {
    // arkadaşlar.push(bro.name); sadece bunu da kullanabilirsin. gerisi hayal gücü
    arkadaşlar.push(`${eleman.name}'in arkdaşı-> ${bro.name}`);
    arkadaşlar.push(...findFriends(bro));
  }
  return arkadaşlar;
}
console.log(findFriends(ali));
