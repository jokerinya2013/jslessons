class Product {
  title = 'DEFAULT';
  imageUrl;
  description;
  price;

  constructor(title, image, desc, price) {
    this.title = title;
    this.imageUrl = image;
    this.description = desc;
    this.price = price;
  }
}
console.log(new Product());
const productList = {
  products: [
    new Product(
      'A Pillow',
      'https://cdn-linens.mncdn.com/Content/Images/Thumbs/0030775_boncuk-elyaf-yastik.jpeg',
      19.99,
      'A soft pillow!'
    ),
    new Product(
      'A Carpet',
      'https://www.halivitrini.com/bahariye-yolluk-hali-77x150-gallery-gp2792p-98741-42-B.jpg',
      89.99,
      'A carpet which you might like - or not.'
    )
  ],
  render() {
    const renderHook = document.getElementById('app');
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';

    for (const prod of this.products) {
      const prodEl = document.createElement('li');
      prodEl.className = 'product-item';
      prodEl.innerHTML = `
			<div>
				<img src="${prod.imageUrl}" alt=${prod.title} />
					<div class="product-item__content">
						<h2>${prod.title}</h2>
						<h3>$${prod.price}</h3>
						<p>${prod.description}</p>
						<button>Add to Your Cart</button>
				</div>
			</div>
			`;

      prodList.append(prodEl);
    }

    renderHook.append(prodList);
  }
};

productList.render();
// NOTLAR
// class keyword ile ve büyük harfle tanımlanır. "=" ile atama yapılır
// içinde constroctor() keyword ile atama yapılır vue deki gibi
