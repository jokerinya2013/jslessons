class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', (event) => {
      if (!confirm('Do you really want to leave?')) {
        event.preventDefault();
      }
    });
  }
}

customElements.define('jokerinya-confirm-link', ConfirmLink, { extends: 'a' });

// bu built-in şey direk olarak, a href i düzenler
// define ederken, generic HTMLElment class ını extend etmediğimiz için,
// 3ncü bir argument geçmemiz gerekiyor
