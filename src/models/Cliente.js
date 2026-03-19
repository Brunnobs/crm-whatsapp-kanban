import mongoose from "mongoose";

const ClienteSchema = new mongoose.Schema({

  nome: {
    type: String,
    required: true
  },

  telefone: {
    type: String,
    required: true
  },

  status: {
    type: String,
    enum: ["conversa", "negociacao", "fechado", "producao", "entrega"],
    default: "conversa"
  }

}, { timestamps: true });

export default mongoose.models.Cliente || mongoose.model("Cliente", ClienteSchema);