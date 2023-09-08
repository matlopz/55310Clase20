const Cart = require('../models/carts.Models');

const cartDao = {
  async getAllCarts() {
    try {
      const carts = await Cart.find();
      return carts;
    } catch (error) {
      throw new Error('Error fetching carts');
    }
  },

  async createCart() {
    try {
      const newCart = new Cart({ products: [] });
      await newCart.save();
      return newCart;
    } catch (error) {
      throw new Error('Error al crear el carrito');
    }
  },

  async getCartById(cartId) {
    try {
      const cart = await Cart.findById(cartId).populate('products.product');
      return cart;
    } catch (error) {
        console.log(error)
      throw new Error('Error fetching cart by ID');
    }
  },

  async addProductToCart(cartId, productId, quantity) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        return { error: 'El carrito no existe' };
      }

      const existingProduct = cart.products.find(item => item.product.equals(productId));

      if (existingProduct) {
        existingProduct.quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      return existingProduct || cart.products[cart.products.length - 1];
    } catch (error) {
      throw new Error('Error agregar product al cart');
    }
  },

  async removeProductFromCart(cartId, productId) {
    try {
      const cart = await Cart.findById(cartId);
      if (!cart) {
        return { error: 'El carrito no existe' };
      }

      cart.products = cart.products.filter(item => !item.product.equals(productId));

      await cart.save();
      return { message: 'Product eliminado del carrito' };
    } catch (error) {
      throw new Error('Error eliminando product del carrito');
    }
  }
};

module.exports = cartDao;
