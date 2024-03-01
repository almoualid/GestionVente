const User = require('../Models/Utilisateur'); 
const Produit =require('../Models/Produit');
const bcrypt = require('bcrypt');
const multer = require('multer');
const jwt = require('jsonwebtoken')
const saltRounds = 10;

const passport = require('passport');

const signup = async (req, res) => {
  const { nom, email, mdp } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà dans la base de données
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'L\'utilisateur existe déjà.' });
    }

    // Hacher le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(mdp, saltRounds);

    // Créer un nouvel utilisateur avec le mot de passe haché
    const newUser = new User({ nom, email, mdp: hashedPassword });

 
    await newUser.save();

    res.status(201).json({ message: 'Inscription réussie.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription.' });
  }
};


/*const login = async (req, res) => {
    const { email, mdp } = req.body;
  
    try {
    
        const hashedPassword = await bcrypt.hash(mdp, saltRounds);
        const user = await User.findOne({ email, mdp:hashedPassword });
  
      if (!user) {
        
        return res.status(401).json({ message: 'Identifiants incorrects' });
      }
  
      // Stocker les informations de l'utilisateur dans la session
      req.session.userId = user._id;
  
      // Répondre avec succès
      res.status(200).json({ message: 'Connexion réussie' });
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
    }
  };*/

  /*const login = async (req, res) =>{
    const { email, mdp} = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ message: "user introuvable" });
    } else {
        bcrypt.compare(mdp,
            user.mdp).then(resultat => {
                if (!resultat) {
                    return res.json({ message: "Incorrect password" });
                }
                else {
                    const payload = {
                        email,
                        nom: user.nom,
                        id: user.id
                    };
                    jwt.sign(payload, "secret", (err,
                        token) => {
                        if (err) console.log(err);
                        else {
                            res.redirect('/index');
                        }
                    });
                }
            });
    }
};*/
/*const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed.' });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.status(200).json({ message: 'Login successful.', user });
    });
  })(req, res, next);
};*/


const login = async (req, res) => {
  const { email, mdp } = req.body;

  try {
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(401).json({ message: 'Identifiants incorrects' });
      }

      // Compare the provided password with the hashed password stored in the database
      const passwordMatch = await bcrypt.compare(mdp, user.mdp);

      if (!passwordMatch) {
          return res.status(401).json({ message: 'Identifiants incorrects' });
      }

      // Set the user's email in the session
      req.session.email = user.email;

      // Respond with success
      res.redirect('/index');
      console.log('Session:', req.session);

  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
  }
};










  const logout = (req, res) => {
    // Détruire la session
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue lors de la déconnexion.' });
      } else {
        
        res.redirect('/login');
      }
    });
  };


  listProduit=async (req,res)=>{
    //récupérer la liste des étudiants
    const produits=await Produit.find()
    res.render('utilisateurs/index',{produits:produits})


}

module.exports = { signup,login,logout,listProduit};
