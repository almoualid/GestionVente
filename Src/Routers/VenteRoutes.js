const express = require('express');
const router = express.Router();
const VenteController = require('../Controllers/VenteController');



// Your route that requires authentication
router.post('/addVente',  VenteController.addVente);




module.exports = router;