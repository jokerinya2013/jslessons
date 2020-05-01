class Tooltip extends HTMLElement {
  constructor() {
    super();

    this._tootipIcon; // burada properties görülemez o yüzden sadece tanımlamak gerekir
    this._tooltipVisible = false;
    this._tooltipText = 'Some dummy tooltip text.';

    this.attachShadow({ mode: 'open' }); // bu shadowRoot u oluşturdu
    // const template = document.querySelector('#tooltip-template');
    // this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.innerHTML = /*html*/ `
      <style>
        div {
          background-color: white;
          color: black;
          position: absolute;
          top: 1.5rem;
          left: 0.75rem;
          z-index: 10;
          box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.5);
          border-color: #ff5454;
          border-radius: 3px;
          padding:0.15rem;
          margin:5px;
          font-weight: normal;
        }
        :host {
          position: relative;
        }

        :host(.important) {
          background:var(--color-primary, #ccc);
          padding: 0.15rem;
        }

        :host-context(p){
          font-weight: bold;

        }
        ::slotted(.highlight) {
          border-bottom: 1px dotted black;
        }
        .icon {
          background-color: black;
          color: white;
          text-align: center;
          padding: 0.2rem 0.5rem;
          border-radius: 50%;
        }
      </style>
      <slot>Some Default</slot>
      <span class="icon">?</span>
    `; // slot aslında, iki custom tag arasında olan bilginin varlığını ve yerini belirtir.
    // bu sayede dışarıdan giriş yapılabilir bu alana
  }

  connectedCallback() {
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text'); //çok önemli buraya gelen bilgi text 'true' mesela
    }
    this._tooltipIcon = this.shadowRoot.querySelector('span');
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    if (name === 'text') {
      this._tooltipText = newValue;
    }
  }

  static get observedAttributes() {
    return ['text']; //bu satır olmadan attributeChangedCallback çalışmaz
  }

  disconnectedCallback() {
    this._tootipIcon.removeEventListener('mouseenter', this._showTooltip);
    this._tootipIcon.removeEventListener('mouseleave', this._hideTooltip);
  }

  // optional

  _render() {
    let _tooltipContainer = this.shadowRoot.querySelector('div');
    if (this._tooltipVisible) {
      _tooltipContainer = document.createElement('div');
      _tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(_tooltipContainer);
    } else {
      if (_tooltipContainer) {
        this.shadowRoot.removeChild(_tooltipContainer);
      }
    }
  }

  _showTooltip() {
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }
}

customElements.define('jokerinya-tooltip', Tooltip);

// extends htmlelement olarak kullanmak durumundayız.
// customElements ile webcomponent ı tanımlııyoruz.
// isimde muhakkak "-" olmalı, ön isim büyük ihtimalle özel bir şey olur diyor
// connectedCallback() -- Dom Initializations
//  şu an çalışıyor aslında connectedCallback() e koymaya gerek yok
// disconnectedCallback() -- Cleanup Work
// attributeChangedCallback() -- Update Data + DOM
// ---> 3 parametre alır (name, old, new)

// Text metninin dışarıdan atayacağız, attributes olarak kullancağız. href, gibi
// önce htmlde bir attribute tanımladık, sonrada burada getAttribute ile çağırdık

// normal olarak style ile ekleyebilirisin ama shadow kullanmak daha makul

// styles sadece shadow doom u etkiliyor

// component arası metin, slotted metin de deniyor, varsa shadow doomun parçası olmuyorlar
// bunlarıda seçip styling yapmak için, burada ::slotted() selector u kullanılır
// hepsini seçmek için ::slotted(*) yapılır
// nested content seçemezsin yani ::slotted(span a) yapamazsın
// burada girdiğimiz stylingler, öncelik olarak diğer stylinglerden altta kalırlar
// overwrite edilir
// :host ile kendisini seçer
// :host(selector) ile uygulanmış olan classı seçebiliriz
// :host-context(selector) ile çerçevelen elemana ulaşabiliriz
