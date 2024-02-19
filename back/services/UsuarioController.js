// controllers/UsuarioController.js
const Usuario = require('../models/use');

async function encontrarUsuarioPorLogin(loginProcurado) {
  console.log(loginProcurado)
  try {
    const usuarioEncontrado = await Usuario.findOne({ email: loginProcurado });

    if (usuarioEncontrado) {
      //send(usuarioEncontrado)
      console.log('Usuário encontrado:', usuarioEncontrado);
    } else {
      console.log('Usuário não encontrado para o login:', loginProcurado);
    }
  } catch (error) {
    console.error('Erro ao procurar usuário por login:', error.message);
    // Lógica de tratamento de erro, se necessário
  }
}

module.exports = {
  encontrarUsuarioPorLogin,
  // Outras funções do controlador...
};
