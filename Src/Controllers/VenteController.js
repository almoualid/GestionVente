const User = require('../Models/Utilisateur'); 
const Produit =require('../Models/Produit');
const Vente = require('../Models/Vente');



exports.addVente = async (req, res) => {
    try {
        // Ensure that idUtilisateur is set in the session
        if (!req.session.email) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Find the user by email to get the ObjectId
        const user = await User.findOne({ email: req.session.email });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Extract data from the request body
        const { idProduit, nom, prix, date, qteC } = req.body;
        if (!mongoose.Types.ObjectId.isValid(idProduit)) {
            return res.status(400).json({ message: 'Invalid idProduit' });
        }

        // Create a new Vente document
        const newVente = new Vente({
            idProduit,
            nom,
            prix,
            datevente: date,
            quantite: qteC,
            idUtilisateur: user.email, 
        });

        // Save the new Vente document to the database
        const savedVente = await newVente.save();

        res.status(201).json({ message: 'Vente added successfully', vente: savedVente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
