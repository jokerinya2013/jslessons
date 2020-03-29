let curElementNumber = 0;

function scrollHandler() {
  const distanceToBottom = document.body.getBoundingClientRect().bottom; // en sona olan mesafesi body nin

  if (distanceToBottom < document.documentElement.clientHeight + 150) {
    //body ile window.innerHeight kıyaslaması, scroll bar ı saklamak için bunu kullandı
    const newDataElement = document.createElement('div');
    curElementNumber++;
    newDataElement.innerHTML = `<p>Element ${curElementNumber}</p>`;
    document.body.append(newDataElement);
  }
}

window.addEventListener('scroll', scrollHandler); // her scrollda func çalıştır
