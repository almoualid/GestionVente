const mongoose = require('mongoose');

const emailValidator = {
  validator: function (value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  },
  message: 'Adresse e-mail non valide',
};

const UtilisateurSchema = new mongoose.Schema({
  
  nom: String,
  email: {
    type: String,
    required: true,
    unique: true,
    validate: emailValidator,
  },
  mdp: String,
  imageU: String
});



module.exports = mongoose.model('Utilisateur', UtilisateurSchema);

