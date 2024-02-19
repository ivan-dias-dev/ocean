var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");
const userService = require("../services/user");
const UsuarioController = require("../services/UsuarioController"); // Importar o objeto exportado
const use = require("../models/use");

/*
router.post("/", async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});
*/
function verificarToken(req, res, next) {
  const token = req.headers.authorization;
  //console.log(token);
  if (!token) {
    return res.status(401).json({ mensagem: "Token não fornecido" });
  }

  jwt.verify(token, "suaChaveSecreta", (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensagem: "Token inválido", token });
    }
    // Se o token for válido, você pode prosseguir com a próxima rota
    req.userId = decoded.userId;
    //console.log(req.userId, "id do user");
    next();
  });
}

router.get("/", async (req, res) => {
  try {
    const userList = await userService.listUsers(); // Acessar a função a partir do objeto
    if (userList) {
      res.send(userList);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/dados/:login", verificarToken, async (req, res) => {
  const token = req.headers.authorization;
  const loginProcurado = req.params.login;
  //const loginProcurado = "mangakaivan@gasas";
  let procurado = await userService.encontrarUsuarioPorLogin(loginProcurado);
  //console.log(procurado);
  res.send(procurado);
});

router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    const authenticatedUser = await userService.authenticateUser(email, senha);
    if (authenticatedUser !== false) {
      //
      const userId = authenticatedUser._id;
      //console.log(userId, "userId");
      const token = jwt.sign(
        { userId: userId, email: authenticatedUser.email },
        "suaChaveSecreta",
        { expiresIn: "30m" }
      );

      res.status(200).json({
        message: "Usuário autenticado com sucesso",
        token,
        userId,
        email,
      });
    } else {
      // Credenciais inválidas
      res.status(401).json({ message: "Credenciais inválidas" });
    }
  } catch (error) {
    // Tratamento de outros erros
    res.status(500).json({ error: error.message });
  }
});

router.post("/vendas2", verificarToken, async (req, res) => {
  const token = req.headers.authorization;
  const userId = req.userId;
  try {
    if (userId) {
      res.status(200).json({ message: "Autenticado", token });
    } else {
      console.log("Não autenticado");
      res.status(401).json({ message: "Não autenticado" });
    }
  } catch (error) {
    console.error("Erro ao verificar o token:", error.message);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

router.get("/vendas2", async (req, res) => {
  // Acessar as informações do usuário dos cabeçalhos da solicitação
  res.render("../views/vendas.ejs", {
    title: "Meu MVP",
  });
});

router.get("/dados", verificarToken, async (req, res) => {
  // Lógica para obter os dados necessários
  // Isso pode incluir consultas ao banco de dados ou outras operações

  const userId = req.headers.userid;
  const email = req.headers.email;

  // Lógica para a página protegida
  let data = await userService.encontrarUsuarioPorLogin(email);

  // Outros usuários aqui...
  //console.log(data);
  // Por exemplo, suponha que você deseja enviar algumas informações do usuário
  res.json(data);
});
//
router.post("/dados", verificarToken, async (req, res) => {
  const userId = req.body.userId; // Use userId em vez de userid
  const email = req.body.email;
  const { valor, quantidade, status, nome } = req.body;

  try {
    // Verifica se o login já existe
    const loginExists = await userService.loginExists(email);

    if (loginExists) {
      const sale = await userService.createSale({
        userId,
        email,
        valor,
        quantidade,
        status,
        nome,
      });
      res.status(201).json(sale);
    } else {
      res.status(401).json({ error: error.message });
    }
    //
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //res.status(400).json({ message: "erro" });
  // Outros usuários aqui...
  // Por exemplo, suponha que você deseja enviar algumas informações do usuário
});

router.get("/produtos", async (req, res) => {
  // Lógica para obter os dados necessários
  // Isso pode incluir consultas ao banco de dados ou outras operações
  //const userId = req.headers.userid;
  //const email = req.headers.email;
  let id = req.headers.id;

  // Lógica para a página protegida
  let data = await userService.encontrarPorProduto(id);

  // Outros usuários aqui...
  console.log(data);
  // Por exemplo, suponha que você deseja enviar algumas informações do usuário
  res.json(data);
});

router.post("/crialogin", async (req, res) => {
  try {
    const { email, name, senha } = req.body;
    // Verifica se o login já existe
    const loginExists = await userService.loginExists(email);

    if (loginExists) {
      return res.status(409).json({ message: "Login já existe" });
    }
    // Se o login não existir, continua com a criação do usuário
    const user = await userService.createUser({ email, name, senha });
    //console.log("usersss",user,"usersss")
    if (user.message) {
      res.status(405).json(user);
    } else {
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    await userService.deleteUser(req.params.userId);
    res.send("deletado");
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put("/:userId", async (req, res) => {
  try {
    await userService.updateUser(req.params.userId, req.body);
    res.send("updated");
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
