const User = require('../Models/Utilisateur'); 
const bcrypt = require('bcrypt');
const multer = require('multer');
const saltRounds = 10;

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  },
});

const upload = multer({ storage: storage });

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

    // Use Multer to handle image upload
    upload.single('imageU')(req, res, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Erreur lors du téléchargement de l\'image.' });
      }

      // File uploaded successfully, get the filename
      const imageFilename = req.file ? req.file.filename : null;

      // Créer un nouvel utilisateur avec le mot de passe haché et le nom du fichier image
      const newUser = new User({ nom, email, mdp: hashedPassword, imageU: imageFilename });

      // Sauvegarder l'utilisateur dans la base de données
      await newUser.save();

      res.status(201).json({ message: 'Inscription réussie.' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription.' });
  }
};



const login = async (req, res) => {
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

module.exports = { signup,login,logout };
