class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }
  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value); // key value şeklinde değer yapar elementAttributes den gelecek buraya
      }
    }
    document.getElementById(this.hookId).append(rootElement);
    return rootElement; // neden döndük bunu?
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )} </h2>`; // get ile totali çağırdı
  }

  get totalAmount() {
    const sum = this.items.reduce(
      (prevValue, curItem) => prevValue + curItem.price,
      0
    );
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems; // seti böyle yapıyoruz...
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart');
    // const cartEl = document.createElement('section'); //yukarı tek yerde topladık artık
    cartEl.innerHTML = `
      <h2>Total: \$${0} </h2>
      <button>Order Now!</button>
    `;
    // cartEl.className = 'cart'; //bunuda yukarıda topladık
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = document.createElement('li');
    prodEl.className = 'product-item';
    prodEl.innerHTML = `
			<div>
				<img src="${this.product.imageUrl}" alt=${this.product.title} />
					<div class="product-item__content">
						<h2>${this.product.title}</h2>
						<h3>$${this.product.price}</h3>
						<p>${this.product.description}</p>
						<button>Add to Your Cart</button>
				</div>
			</div>
      `;
    const addCartButton = prodEl.querySelector('button');
    addCartButton.addEventListener('click', this.addToCart.bind(this));
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      'A Pillow',
      'https://cdn-linens.mncdn.com/Content/Images/Thumbs/0030775_boncuk-elyaf-yastik.jpeg',
      'A soft pillow!',
      19.99
    ),
    new Product(
      'A Carpet',
      'https://www.halivitrini.com/bahariye-yolluk-hali-77x150-gallery-gp2792p-98741-42-B.jpg',
      'A carpet which you might like - or not.',
      89.99
    )
  ];

  constructor() {}

  render() {
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';

    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();
      prodList.append(prodEl);
    }
    return prodList;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById('app');

    this.cart = new ShoppingCart('app');
    this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(prodListEl);
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();

// NOTLAR
// class keyword ile ve büyük harfle tanımlanır. "=" ile atama yapılır
// içinde constroctor() keyword ile atama yapılır vue deki gibi
// product arrayi için new Product(arguments) ile tanımlamayı yaptık bu sayede keyler tanımlanmış oldu ve
// yanlış yazma olmaz.
// yukarı shopping cart a get set koyduk. get return eder bir değeri
// set(val) val ı almak zorundadır.
// setAttribute("class", "yeni-class") ----> html içinde class="yeni-class" yazar bunun gibi bir kullanımı var

// class Deneme {
//   adı; //burası olmak zorunda değil field deniyor bu bölgeye
//   soyadı;
//   constructor(isim, soyisim) {
//     this.adı = isim;
//     this.soyadı = soyisim;
//   }
//   deneme() {
//     console.log('denemen başarılı');
//   }
// }

// const isimler = {
//   kimlik: [new Deneme('ibrahim', 'şakacı'), new Deneme('afra', 'şakacı')],
//   yaz() {
//     console.log(this.kimlik[0].adı); //ibrahim
//     console.log(this.kimlik[1].adı); //afra
//   }
// };

// isimler.yaz();
// // const yazma = new Deneme();
// // yazma.deneme();
// new Deneme().deneme();
