const express = require('express');
const router = express.Router();
const cartsService = require('../services/cartsService');
const Chat = require('../io');
const io = Chat()


router.get('/', async (req, res) => {
  try {
    const carts = await cartsService.getAllCarts();
    
    res.json(carts); 
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const cart = await cartsService.getCartProducts(cid);
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newCart = await cartsService.createCart();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity; 

    // Agregar el producto al carrito utilizando el servicio cartsService
    const result = await cartsService.addProductToCart(cid, pid, quantity);

    // Emitir el producto agregado al carrito a través de Socket.IO
    io.emit('productAddedToCart', { cartId: cid, product: result });

    res.status(result.statusCode || 200).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
