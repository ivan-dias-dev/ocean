var express = require("express");
var router = express.Router();
const userService = require("../services/user");
const UsuarioController = require("../services/UsuarioController"); // Importar o objeto exportado



router.get("/", async (req, res) => {
  res.render("../views/index.ejs", { title: "Meu MVP" });
});
router.get("/login", async (req, res) => {
  res.render("../views/criaLogin.ejs", { title: "Meu MVP" });
});



module.exports = router;
