const num1Input = document.getElementById('num1') as HTMLInputElement;
const num2Input = <HTMLInputElement>document.getElementById('num2');
const button = document.querySelector('button');

function add(a: number, b: number) {
  return a + b;
}

function printResult(result) {
  console.log(result);
}

// const result = add(5, 3);
// let isDone = false;

// printResult(result);

button.addEventListener('click', () => {
  const num1 = +num1Input.value;
  const num2 = +num2Input.value;
  const result = add(num1, num2);
  printResult(result);
});

// npm install -g typescript ile global bir package
// olarak yükledik. js i eski versiyonuna çeviren teknoloji
// js++ diyor Max :)
// belki babel kullandırmayabilir
// hiçbir şey return yapmayacaksak, tür void olmalı, yada boş bırak o void yapar
