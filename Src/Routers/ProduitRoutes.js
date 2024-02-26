// src/routes/ProduitRoutes.js
const express = require('express');
const router = express.Router();
const ProduitController = require('../Controllers/ProduitController');

// Définition des routes pour les produits
router.get('/produit', ProduitController.listProduit);
// Ajoutez d'autres routes selon vos besoins

module.exports = router;
