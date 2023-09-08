const UsuarioDAO = require('../dao/usuarioDao')



const UsuarioService= {
    async crearUsuario() {
        return UsuarioDAO.createUser()
},
async usuariobyEmail(){
    return UsuarioDAO.getUserByEmail()
},
}
module.exports = UsuarioService

   
