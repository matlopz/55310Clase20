const Usuario = require('../models/Users.Model')

const UsuarioDAO = {
    async createUser(userInfo) {
      try {
        const newUser = new Usuario(userInfo);
        await newUser.save();
        return newUser;
      } catch (error) {
        throw new Error('Error al crear un usuario');
      }
    },
    async getUserByEmail(email) {
        try {
          return await Users.findOne({ email });
        } catch (error) {
          throw new Error('Error al buscar el usuario por correo electrónico');
        }
      },
  };
module.exports = UsuarioDAO