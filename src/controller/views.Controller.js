const express = require('express');
const io = require('../io');
const Products = require('../models/products.models');
const HTTP_STATUS_CODE = require('../constants/error.constants');
const productsService = require('../services/productsService')
const cartsService = require('../services/cartsService')
const mongoose = require('mongoose');
const router = express.Router();

router.get('/productos', async (req, res) => {
  try {
    if (req.session && req.session.user) {
      const usuario = {
        name: req.session.user.name,
        cartId: req.session.user.cartId,
      };

      const products = await productsService.getAllProducts({});
      res.render('products', { products, usuario });
    } else {
      
      res.status(401).json({ status: 'Error', error: 'No autorizado' });
    }
  } catch (err) {
    console.error('GET Products - Error:', err);
    res.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
  }
});


router.get('/carritos/:cid', async (req, res) => {
  try {
    const cid = req.params.cid;
    console.log(cid);
    const cart = await cartsService.getCartProducts(cid);
    console.log({ cart });
    if (cart) {
      res.render('carts', { cart });
      console.log('que tiene res: ', cart);
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  } catch (err) {
    console.error('GET carts - Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
