// importer le modèle qui expose un ensemble des méthodes d'accès aux données
const Produit = require('../Models/Produit')

// Définir les actions
exports.listProduit = async (req, res) => {
    try {
      // Récupérer la liste des produits depuis la base de données
      const produits = await Produit.find();
      
      
      res.render('produits/index', { produits: produits });
    } catch (error) {
    
      res.status(500).json({ error: 'Erreur lors de la récupération des produits.' });
    }
  };