const productForm = document.getElementById('productForm');
const productList = document.getElementById('productList');

let products = [];

productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('productName').value.trim();
  const quantity = document.getElementById('productQuantity').value;

  if (name && quantity >= 0) {
    const newProduct = {
      id: Date.now(),
      name,
      quantity,
      inStock: true
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
    li.className = product.inStock ? '' : 'out-of-stock';

    li.innerHTML = `
      <span><strong>${product.name}</strong> - Qty: ${product.quantity} ${!product.inStock ? '(Out of Stock)' : ''}</span>
      <div class="buttons">
        <button onclick="editProduct(${product.id})">Edit</button>
        <button onclick="toggleStock(${product.id})">${product.inStock ? 'Out of Stock' : 'In Stock'}</button>
        <button onclick="deleteProduct(${product.id})">Delete</button>
      </div>
    `;

    productList.appendChild(li);
  });
}

function editProduct(id) {
  const product = products.find(p => p.id === id);
  const newName = prompt('Edit product name:', product.name);
  const newQuantity = prompt('Edit quantity:', product.quantity);

  if (newName !== null && newQuantity !== null && newQuantity >= 0) {
    product.name = newName.trim();
    product.quantity = parseInt(newQuantity);
    renderProducts();
  }
}

function toggleStock(id) {
  const product = products.find(p => p.id === id);
  product.inStock = !product.inStock;
  renderProducts();
}

function deleteProduct(id) {
  if (confirm('Are you sure you want to delete this product?')) {
    products = products.filter(p => p.id !== id);
    renderProducts();
  }
}
