// responsible for showing modal

export class Modal {
  constructor(contentId, fallbackText) {
    this.fallbackText = fallbackText;
    this.contentTemplateEl = document.getElementById(contentId);
    this.modalTemplateEl = document.getElementById('modal-template');
  }
  show() {
    // ie sorgusu template oluştur ve içinde content var mı bak demek. ie bunu yapamaz.
    if ('content' in document.createElement('template')) {
      const modalElements = document.importNode(this.modalTemplateEl.content, true); //templateı kopyala
      this.modalElement = modalElements.querySelector('.modal'); // içinden modalı seç, global olsun(this)
      this.backdropElement = modalElements.querySelector('.backdrop'); // içinden backdropu seç
      const contentElement = document.importNode(this.contentTemplateEl.content, true); // gelen elemanı copy

      this.modalElement.appendChild(contentElement); // content i modal a ekle

      document.body.insertAdjacentElement('afterbegin', this.modalElement); // modalı body e ekle
      document.body.insertAdjacentElement('afterbegin', this.backdropElement); // bd body e ekle
    } else {
      // fallback code
      alert(this.fallbackText);
    }
  }
  hide() {
    // modal element imiz var mı diye kontrol ediyoruz emin olmak için
    if (this.modalElement) {
      document.body.removeChild(this.backdropElement); //this.backdropElement.remove() daha browser desteği var
      document.body.removeChild(this.modalElement);
      this.backdropElement = null; // memory temizliği için, şart değil ama iyi olur
      this.modalElement = null;
    }
  }
}

// <template> is not supported ie
// insertAdjacetnElement(pozisyon, element). çok kullanışlı
// dikkat modal içinde yer alacak olan content i de importNode ile kopyalıyoruz
// işlemi tamamladıktan sonra export ettik
