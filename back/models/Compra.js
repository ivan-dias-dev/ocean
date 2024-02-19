const mongoose = require("mongoose");

const CompraSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Tipo de dados para armazenar IDs de objetos no MongoDB
    ref: "User", // Referência ao esquema de usuário
    required: true, // Garante que o ID do usuário seja obrigatório
  },
  nome: { type: String, required: true },
  data: { type: Date, default: Date.now },
  valor: { type: Number, required: true },
  quantidade: { type: Number, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("Compra", CompraSchema);
