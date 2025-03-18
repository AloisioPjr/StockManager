const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

let products = [];

productForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('productName').value.trim();

  if (name) {
    const newProduct = {
      id: Date.now(),
      name
    };

    products.push(newProduct);

    productForm.reset();
    renderProducts();
  }
});

function renderProducts() {
  productList.innerHTML = '';

  products.forEach(product => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${product.name}</strong>`;
    productList.appendChild(li);
  });
}
