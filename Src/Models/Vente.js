const mongoose = require('mongoose');

const VenteSchema = new mongoose.Schema({
  datevente: { type: Date, default: Date.now },
  quantite: { type: Number, required: true },
  idProduit: { type: String },
  //idUtilisateur: { type: mongoose.Schema.Types.ObjectId, ref: 'Utilisateur' },
});

module.exports = mongoose.model('Vente', VenteSchema);
