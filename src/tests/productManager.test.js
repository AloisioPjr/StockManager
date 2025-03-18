// CommonJS import of the productManager module
const {
  products,
  addProduct,
  editProduct,
  toggleStock,
  deleteProduct,
  clearProducts
} = require('../scripts/productManager');

beforeEach(() => {
  clearProducts();
  jest.spyOn(global.Date, 'now').mockImplementation(() => 123456789);
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('Product Manager', () => {
  
  test('should add a product', () => {
    const product = addProduct('Apple', 10);
    expect(product).toEqual({
      id: 123456789,
      name: 'Apple',
      quantity: 10,
      inStock: true
    });
    expect(products.length).toBe(1);
  });

  test('should not add product with invalid name or quantity', () => {
    expect(addProduct('', 10)).toBeNull();
    expect(addProduct('Orange', -5)).toBeNull();
    expect(products.length).toBe(0);
  });

  test('should edit a product', () => {
    const product = addProduct('Banana', 5);
    const editedProduct = editProduct(product.id, 'Mango', 15);

    expect(editedProduct.name).toBe('Mango');
    expect(editedProduct.quantity).toBe(15);
  });

  test('should not edit product if invalid values', () => {
    const product = addProduct('Grapes', 8);
    expect(editProduct(product.id, '', 10)).toBeNull();
    expect(editProduct(product.id, 'Pear', -1)).toBeNull();
  });

  test('should toggle stock status', () => {
    const product = addProduct('Watermelon', 3);
    expect(product.inStock).toBe(true);

    const toggled = toggleStock(product.id);
    expect(toggled).toBe(false);

    const toggledBack = toggleStock(product.id);
    expect(toggledBack).toBe(true);
  });

  test('should return null if toggle stock on non-existent product', () => {
    expect(toggleStock(9999)).toBeNull();
  });

  test('should delete product', () => {
    const product1 = addProduct('Kiwi', 4);
    const product2 = addProduct('Pineapple', 6);

    expect(products.length).toBe(2);
    const deleted = deleteProduct(product1.id);

    expect(deleted).toBe(true);
    expect(products.length).toBe(1);
    expect(products[0].name).toBe('Pineapple');
  });

  test('should return false if deleting non-existent product', () => {
    addProduct('Lemon', 2);
    expect(deleteProduct(999)).toBe(false);
  });

});
