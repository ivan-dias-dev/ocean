const databaseConnection = require("../utils/db");
const User = require("../models/use");
const Compra = require("../models/Compra");
const jwt = require("jsonwebtoken");

const listUsers = async () => {
  await databaseConnection();
  const users = await User.find();
  return users;
};
/**
 * const listUsers = async () => {
  await databaseConnection();
  const users = await User.find().populate('compras');
  return users;
};

 */
const createUser = async (user) => {
  try {
    await databaseConnection();
    const createdUser = await User.create(user);
    return createdUser;
  } catch (error) {
    return error;
  }
};

const createSale = async (dados) => {
  try {
    await databaseConnection();
    const userId = dados.userId;
    const createdSale = await Compra.create({
      userId: userId,
      email: dados.email,
      valor: dados.valor,
      quantidade: dados.quantidade,
      status: dados.status,
      nome: dados.nome,
    });

    //"valores", createdSale);

    const user = await User.findById(dados.userId);
    user.compras.push(createdSale);
    await user.save();
    return createdSale;
  } catch (error) {
    return error;
  }
};

const deleteUser = async (id) => {
  await databaseConnection();
  await User.findByIdAndDelete(id);
};

const updateUser = async (id, newbody) => {
  await databaseConnection();
  await User.findByIdAndUpdate(id, newbody);
};

const loginExists = async (email) => {
  // Lógica para verificar a existência do login no banco de dados
  await databaseConnection();
  const existingUser = await User.findOne({ email });
  return !!existingUser; // Retorna true se o login já existe, false caso contrário
};

const authenticateUser = async (email, senha) => {
  await databaseConnection();
  let logado = false;
  const existingUser = await User.findOne({ email });

  if (senha == existingUser.senha) {
    //console.log("Logou");
    //logado = true;
    return existingUser;
    //existingUser.push("true")
  } else {
    //console.log("Não logou");
    logado = false;
    return false;
  }
  //console.log(logado);

  // Retorna true se o login já existe, false caso contrário
};
const encontrarUsuarioPorLogin = async (loginProcurado) => {
  await databaseConnection();

  try {
    const usuarioEncontrado = await User.findOne({ email: loginProcurado });

    if (usuarioEncontrado) {
      //send(usuarioEncontrado)
      console.log("Usuário encontrado:");
      return usuarioEncontrado;
    } else {
      console.log("Usuário não encontrado para o login:");
      return loginProcurado;
    }
  } catch (error) {
    console.error("Erro ao procurar usuário por login:", error.message);
  }
};

const encontrarPorProduto = async (id) => {
  await databaseConnection();

  try {
    const buscaCompra = await Compra.findOne({ _id: id });

    if (buscaCompra) {
      console.log("Produto encontrado:", buscaCompra);
      return buscaCompra;
    } else {
      return "produtoNaoEncontrado";
    }
  } catch (error) {
    console.error("Erro ao procurar compra:", error.message);
  }
};

module.exports = {
  listUsers,
  createUser,
  deleteUser,
  updateUser,
  loginExists,
  authenticateUser,
  createSale,
  encontrarUsuarioPorLogin,
  encontrarPorProduto,
  // verificaToken,
};
