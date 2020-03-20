class Product {
  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}

class ShoppingCart {
  items = [];

  addProduct(product) {
    this.items.push(product);
    this.totalOutput = `<h2>Total: \$${1} </h2>`;
  }

  render() {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
      <h2>Total: \$${0} </h2>
      <button>Order Now!</button>
    `;
    cartEl.className = 'cart';
    this.totalOutput = cartEl.querySelector('h2');
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }

  addToCart() {
    console.log('Adding product to cart...');
    console.log(this.product);
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

    const cart = new ShoppingCart();
    const cartEl = cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

const shop = new Shop();
shop.render();

// NOTLAR
// class keyword ile ve büyük harfle tanımlanır. "=" ile atama yapılır
// içinde constroctor() keyword ile atama yapılır vue deki gibi
// product arrayi için new Product(arguments) ile tanımlamayı yaptık bu sayede keyler tanımlanmış oldu ve
// yanlış yazma olmaz.

class Deneme {
  adı; //burası olmak zorunda değil field deniyor bu bölgeye
  soyadı;
  constructor(isim, soyisim) {
    this.adı = isim;
    this.soyadı = soyisim;
  }
  deneme() {
    console.log('denemen başarılı');
  }
}

const isimler = {
  kimlik: [new Deneme('ibrahim', 'şakacı'), new Deneme('afra', 'şakacı')],
  yaz() {
    console.log(this.kimlik[0].adı); //ibrahim
    console.log(this.kimlik[1].adı); //afra
  }
};

isimler.yaz();
// const yazma = new Deneme();
// yazma.deneme();
new Deneme().deneme();
