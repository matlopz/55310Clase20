const express = require('express');
const usuarioService = require('../services/usuarioService');
const router = express.Router();
const { getHashedPassword,comparePassword  } = require('../utils/bcrypts');
const Usuarios = require('../models/Users.Model');
const cartsModels = require('../models/carts.Models');


router.get('/register', (req, res) => {
    res.render('register')
  })

  router.post('/register', async (req, res) => {
    try {
      const { name, lastname, email, password } = req.body;
  
    
      const newUser = await Usuarios.create({
        name,
        lastname,
        email,
        password: getHashedPassword(password),
        cart: [],
      });
  
      const cart = await cartsModels.create({ products: [] });
      const cartId = cart._id;
      newUser.cart.push({ product: cart._id, quantity: 0 });
      await newUser.save();
      console.log(newUser)
      console.log(cartId)
      res.status(201).json({ status: 'success', payload: newUser, cartId });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
  });
  

  router.get('/login', (req, res) => {
    res.render('login')
  })

  router.post('/login', async (req, res) => {
    try {
        console.log('llegá'); 
        const { email, password } = req.body;

        if (!email || !password) {
   
            console.log('Datos incompletos'); 
            return res.status(400).json({ status: 'error', error: 'Bad request' });
        }

        const user = await Usuarios.findOne({ email });

        if (!user) {
           
            console.log('Usuario no encontrado'); 
            return res.status(400).json({ status: 'error', error: 'User not found' });
        }

        if (!comparePassword(password, user.password)) {
        
            console.log('Contraseña incorrecta'); 
            return res.status(400).json({ status: 'error', error: 'User and password not matched' });
        }
        const cartId = user.cart[0].product.toString();
        console.log('que tiene ',cartId)
        req.session.user={
            name: user.name,
            cartId: user.cart[0].product.toString(),
        }
        console.log('Inicio de sesión exitoso',req.session.user); 
        res.json({ status: 'success', payload: 'New session initialized', cartId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
});


  module.exports = router