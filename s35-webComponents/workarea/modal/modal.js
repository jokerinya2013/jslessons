class Modal extends HTMLElement {
  constructor() {
    super();
    this.isOpen = false;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = /*html*/ `
        <style>
            #backdrop {
                position: fixed;
                top: 0;
                z-index: 10;
                left:0;
                width: 100%;
                height: 100vh;
                background: rgba(0, 0, 0, 0.75);
                opacity: 0;
                pointer-events: none;
            }
            :host([opened]) #backdrop,
            :host([opened]) #modal {
                opacity: 1;
                pointer-events: all;
            }
            :host([opened]) #modal {
                top: 15vh;
            }
            #modal {
                position: fixed;
                top: 10vh;
                left: 25%;
                width: 50%;
                z-index: 100;
                background: white;
                border-radius: 3px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                opacity: 0;
                pointer-events: none;
                transition: all 0.8s ease-out;
            }
            header {
                padding: 1rem;
                border-bottom: 1px solid #ccc;
            }
            ::slotted(h1) {
                font-size: 1.25rem;
                margin: 0;
            }
            #main {
                padding: 1rem;
            }
            #actions {
                border-top: 1px solid #ccc;
                padding: 1rem;
                text-align: right;
            }
            #actions button {
                margin: 0 0.25rem;
            }
        </style>
        <div id="backdrop"></div>
        <div id="modal">
            <header>
                <slot name="title">Incase in Html title named slotted el is empty.</slot>
            </header>
            <section id="main">
                <slot></slot>
            </section>
            <section id="actions">
                <button id="cancel-btn">Cancel</button>
                <button id="confirm-btn">Okay</button>
            </section>
        </div>
    `;

    const backdrop = this.shadowRoot.getElementById('backdrop');

    const slots = this.shadowRoot.querySelectorAll('slot');
    slots[1].addEventListener('slotchange', (event) => {
      console.dir(slots[1].assignedNodes());
    }); // slotları okumamızı sağlar.. helpful bu

    const cancelButton = this.shadowRoot.querySelector('#cancel-btn');
    const confirmButton = this.shadowRoot.querySelector('#confirm-btn');
    cancelButton.addEventListener('click', this._cancel.bind(this));
    confirmButton.addEventListener('click', this._confirm.bind(this));
    backdrop.addEventListener('click', this._cancel.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.hasAttribute('opened')) {
      this.isOpen = true;
      //   this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
      //   this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
      //   this.shadowRoot.querySelector('#modal').style.opacity = 1;
      //   this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
    } else {
      this.isOpen = false;
    }
  }

  static get observedAttributes() {
    return ['opened'];
  }

  open() {
    this.setAttribute('opened', '');
    this.isOpen = true;
  }

  hide() {
    if (this.hasAttribute('opened')) {
      this.removeAttribute('opened');
    }
    this.isOpen = false;
  }

  _cancel(event) {
    this.hide();
    const cancelEvent = new Event('cancel', { bubbles: true, composed: true }); //html deki cancel event ile ismi aynı olacak
    event.target.dispatchEvent(cancelEvent); // bubbles ve composed true olmalı bu bir yol
  } // bu yolla buttondan event yayıyoruz..

  _confirm() {
    this.hide();
    const confirmEvent = new Event('confirm'); // bu da ikinci yol, burada ise custom elden yayıyoruz
    this.dispatchEvent(confirmEvent);
  }
}

customElements.define('jokerinya-modal', Modal);

// id seçimi class dan daha hızlıdır diyor
// ::slotted(slotun kendi selectörü olmalı)
// 3 yol ile yapabiliriz aslında,
// 1 yorumlu yöntem, 2 css, 3 open() functionı ile
// yorum yapılmış şekilde de yapabilirsin
// :host([opened]) #backdrop {} --> şu demek, opened attribute u varsa şunu yap demek
// eğer hiç isim verilmezse ilk slot tüm slotları toplar, isim verilen slotlar kendilerininkini
// toplarlar
