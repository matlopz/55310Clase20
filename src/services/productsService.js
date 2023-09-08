const ProductDao = require('../dao/product.Dao');

const productService = {
  async getAllProducts() {
    return ProductDao.getAllProducts();
  },

  async getProductById(pid) {
    return ProductDao.getProductById(pid);
  },

  async addProduct(product) {
    return ProductDao.addProduct(product);
  },

  async updateProduct(pid, updatedProduct) {
    return ProductDao.updateProduct(pid, updatedProduct);
  },

  async deleteProduct(pid) {
    return ProductDao.deleteProduct(pid);
  },
  async getProductsByQuery(queryParams) {
    return ProductDao.getProductsByQuery(queryParams);
  }
};

module.exports = productService;
