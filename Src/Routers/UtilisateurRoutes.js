const express = require('express');
const router = express.Router();
const UserController  = require('../Controllers/UtilisateurController');






// Route pour le processus d'inscription
router.get('/index', UserController.listProduit);
router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/signup', (req, res) => {
    res.render('utilisateurs/signup')
    });

router.get('/login', (req, res) => {
        res.render('utilisateurs/login')
        });
router.get('/index', (req, res) => {
            res.render('utilisateurs/index')
});
module.exports = router;