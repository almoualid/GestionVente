const express = require('express');
const router = express.Router();
const VenteController = require('../Controllers/VenteController');



// Your route that requires authentication
router.post('/addVente',  VenteController.addVente);
router.get('/pannier',  VenteController.listVentes);
router.put('/edit', VenteController.editVente);
router.delete('/supp', VenteController.deleteVente);
router.get('/pannier', (req, res) => {
    res.render('utilisateurs/pannier')
    });




module.exports = router;