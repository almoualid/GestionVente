// src/models/Produit.js
const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
  idProduit: { type: String, required: true },
  nom: String,
  marque: String,
  prix: Number,
  qtestock: Number,
});

module.exports = mongoose.model('Produit', produitSchema);
