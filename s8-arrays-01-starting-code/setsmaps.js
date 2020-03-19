// sets

const ids = new Set(['Hi', 'From', 'Set!']);
ids.add(4);
console.log(ids.has(1)); //false

if (ids.has('Hi')) {
  ids.delete('Hi');
}

for (const entry of ids.values()) {
  console.log(entry);
}

// maps

const person1 = { name: 'İbrahim' };
const person2 = { name: 'Afra' };

const personData = new Map([[person1, [{ date: 'yesterday', price: 10 }]]]);
// key burada obj, value ise array ve içinde object var
const deneme = new Map([
  ['yaş', 30],
  ['adım', 3000]
]);
console.log(deneme);

personData.set(person2, [{ date: 'Two Weeks ago', price: 100 }]);

console.log(personData);
console.log(personData.get(person1));

for (const [key, value] of personData.entries()) {
  console.log('key:' + key, 'value:' + value);
}

for (const key of personData.keys()) {
  console.log('key:', key);
}

for (const value of personData.values()) {
  console.log('value:', value);
}

console.log(personData.size);

// WeakSet
let insan = { isim: 'ibo' };
const persons = new WeakSet();
persons.add(insan);

// ....some operations
// insan = null;

console.log(persons);

// WeakMap
const personDatas = new WeakMap();
personDatas.set(insan, 'Bu kısım value');

insan = null;

console.log(personDatas);

// NOtlar
// setlerde uniqe value kullanılır
// id ler için kullanılabilir
// map şu şekilde tanımlanır
// const personData = new Map([['key', 'some value']])
// weakSet ve weakmap çok nadir kullanımı olur dedi.
// console.log yapınca her ne kadar görsekte
// bir süre sonra garbagge collector tarafından toplanırmış özelliği bu
