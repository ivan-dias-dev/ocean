const mongoose = require("mongoose");
const Compra = require("./Compra");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  senha: { type: String, required: true },
  compras: [Compra.schema], // Use Compra.schema para acessar o esquema
});

module.exports = mongoose.model("User", UserSchema);