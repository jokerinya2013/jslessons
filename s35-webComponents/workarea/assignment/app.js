class Button extends HTMLElement {
  constructor() {
    super();

    this._isHidden = true;
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = /*html*/ `
        <style>
            #info-box {
                display: none;
                position: absolute;
                background-color: white;
            }
        </style>
        
        <button>Show</button>
        <p id="info-box">
          <slot></slot>
        </p>
    `;
    this._button = this.shadowRoot.querySelector('button');
    this._infoEl = this.shadowRoot.querySelector('#info-box');
  }

  connectedCallback() {
    if (this.hasAttribute('is-hidden')) {
      if (this.getAttribute('is-hidden') === 'false') {
        this._infoEl.style.display = 'block';
        this._button.textContent = 'Hide';
        this._isHidden = false;
      }
    }
    this._button.addEventListener('click', this._buttonHandler.bind(this));
  }
  _buttonHandler() {
    this._isHidden = !this._isHidden;
    this._infoEl.style.display = this._isHidden ? 'none' : 'block';
    this._button.textContent = this._isHidden ? 'Show' : 'Hide';
  }
}

customElements.define('assingment-button', Button);
