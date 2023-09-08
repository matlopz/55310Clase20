const cartDao = require('../dao/cartDao'); 
const productsService = require('./productsService'); 
const HTTP_STATUS_CODE = require('../constants/error.constants'); 

const cartsService = {
  async getAllCarts() {
    return cartDao.getAllCarts();
  },

  async createCart() {
    return cartDao.createCart();
  },

  async getCartProducts(cartId) {
    try {
   
      if (!cartId || cartId === 'null') {
        throw new Error('El cartId es nulo o no válido');
      }
  
      return await cartDao.getCartById(cartId.toString());
    } catch (error) {
      console.error('error:', error);
      throw new Error('Error obtener carrito');
    }
  },
  async addProductToCart(cid, pid, quantity) {
    const product = await productsService.getProductById(pid);

    if (!product) {
      return { error: 'El producto no existe', statusCode: HTTP_STATUS_CODE.NOT_FOUND };
    }

    return cartDao.addProductToCart(cid, pid, quantity);
  },
};

module.exports = cartsService;
