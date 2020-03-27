const intervalId = setInterval(() => {
  console.log('Sending analytics...'); // 3+2 = 5 sn sonra başlar
}, 2000);

document.getElementById('stop-analytics-btn').addEventListener('click', () => {
  clearInterval(intervalId);
});
