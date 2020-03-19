// 1
const itemOne = document.getElementById('task-1');
itemOne.style.backgroundColor = 'black';
const itemOneOther = document.querySelector('#task-1');
itemOneOther.style.color = 'white';

// 2
const title = document.querySelector('head title');
title.textContent = 'Assignment-Solved!';

document.title = 'Something!';

// 3
const h1 = document.getElementsByTagName('h1');
h1[0].style.height = '15rem';
console.dir(h1);

const overText = () => {
  h1[0].textContent = 'Assignment Solved!';
};
const outText = () => {
  h1[0].textContent = 'Assignment - DOM Querying & Manipulation';
};

h1[0].addEventListener('mouseover', overText);
h1[0].addEventListener('mouseout', outText);
