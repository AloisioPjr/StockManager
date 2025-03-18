let products = [];

function addProduct(name, quantity) {
  if (!name || quantity < 0) return null;

  const newProduct = {
    id: Date.now(),
    name,
    quantity,
    inStock: true
  };

  products.push(newProduct);
  return newProduct;
}

function editProduct(id, newName, newQuantity) {
  const product = products.find(p => p.id === id);
  if (!product || !newName || newQuantity < 0) return null;

  product.name = newName.trim();
  product.quantity = parseInt(newQuantity);
  return product;
}

function toggleStock(id) {
  const product = products.find(p => p.id === id);
  if (!product) return null;

  product.inStock = !product.inStock;
  return product.inStock;
}

function deleteProduct(id) {
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;

  products.splice(index, 1); // Mutate the array
  return true;
}

function clearProducts() {
  products.length = 0; // Mutate the array
}

module.exports = {
  products,
  addProduct,
  editProduct,
  toggleStock,
  deleteProduct,
  clearProducts
};
