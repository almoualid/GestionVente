// src/routes/ProduitRoutes.js
const express = require('express');
const router = express.Router();
const ProduitController = require('../Controllers/ProduitController');
const path = require('path');
const fileUpload = require('express-fileupload');

router.use(fileUpload()); // Add this line to enable file upload middleware

// Définition des routes pour les produits
router.get('/produit', ProduitController.listProduit);
router.post('/store', ProduitController.addProd);
router.put('/update', ProduitController.editProd);
router.delete('/delete', ProduitController.deleteProd);

module.exports = router;
