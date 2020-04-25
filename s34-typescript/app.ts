// class User {
//   name: string; // field olarak eklemeden hata veriyor, yada aşağıdaki gibi yapacaksn
//   private age: number; // default publictir, private olunca sadece içeride kullandırıyor

//   constructor(name: string, age: number) {
//     this.name = name;
//     this.age = age;
//   }
// }

interface Greetable {
  name: string;
}

interface Printable {
  print(): void;
}

class User implements Greetable, Printable {
  constructor(public name: string, private age: number) {
    // böyle yapınca field yapmaya gerek yok
  }

  print() {
    console.log(this.name);
  }
}

class Admin extends User {
  constructor(name: string, age: number, private permissions: string[]) {
    super(name, age);
  }
}

const user = new User('İbo', 30);
// console.log(user.name, user.age); // hata veriyor, age private olduğu için

const num1Input = document.getElementById('num1') as HTMLInputElement;
const num2Input = <HTMLInputElement>document.getElementById('num2');
const button = document.querySelector('button')!;

function add(a: number, b: number) {
  return a + b;
}

type PrintMode = 'console' | 'alert'; // union şeklinde kullanım,
enum OutputMode {
  CONSOLE,
  ALERT,
} // union kullanımının değişik şekli

function printResult(result: string | number, printMode: OutputMode) {
  // bu şekilde kullanınca ide desteği de oluyor
  if (printMode === OutputMode.CONSOLE) {
    console.log(result);
  } else if (printMode === OutputMode.ALERT) {
    alert(result);
  }
}

// const result = add(5, 3);
// let isDone = false;

// printResult(result);

interface CalcutaionContainer {
  res: number;
  print(): void;
}

// type CalculationResults = { res: number; print: () => void }[];
type CalculationResults = CalcutaionContainer[]; // bu şekilde de tanımlayabiliriz

// const results: CalculationResults = []; // içerisinde { res: number } bu obj barından array demek
const results: Array<CalcutaionContainer> = []; // içerisinde { res: number } bu obj barından array demek
const names = ['Ali', 'Veli']; // array türünü direk str olarak düzenliyor

button.addEventListener('click', () => {
  const num1 = +num1Input.value;
  const num2 = +num2Input.value;
  const result = add(num1, num2);
  const resultContainer = {
    res: result,
    print() {
      console.log(this.res);
    },
  };
  results.push(resultContainer);
  // results.push(5); // yukarıda arrayı tanımladığımız için hata veriyoruz burada
  // results[0].print();
  printResult(result, OutputMode.CONSOLE);
  printResult(result, OutputMode.ALERT);
  // printResult(result, 'window'); // hata verdiriyor, yukarıda union type yaptığımız için
});

function logAndEcho<T>(val: any) {
  console.log(val);
  return val;
}

logAndEcho<string>('Hi There!');

// npm install -g typescript ile global bir package
// olarak yükledik. js i eski versiyonuna çeviren teknoloji
// js++ diyor Max :)
// belki babel kullandırmayabilir
// hiçbir şey return yapmayacaksak, tür void olmalı, yada boş bırak o void yapar
// tsc -init yapınca yeni bir json dosya oluşturuyor
// tsc ile basınca buradaki ayarlamalara göre tüm ts leri js yapıyor
