//const User = require('../Models/Utilisateur'); 
const Produit =require('../Models/Produit');
const Vente = require('../Models/Vente');



exports.addVente = async (req, res) => {
    try {
        // Ensure that idUtilisateur is set in the session
        /*if (!req.session.email) {
            return res.status(401).json({ message: 'User not authenticated' });
        }*/

        // Find the user by email to get the ObjectId
        //const user = await User.findOne({ email: req.session.email });

        /*if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }*/

        // Extract data from the request body
        const { idProduit, nom, prix, date, qteC } = req.body;
        

        // Create a new Vente document
        const newVente = new Vente({
            idProduit,
            nom,
            prix,
            datevente: date,
            quantite: qteC,
           // idUtilisateur: user.email, 
        });

        // Save the new Vente document to the database
        const savedVente = await newVente.save();

        res.status(201).json({ message: 'Vente added successfully', vente: savedVente });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



exports.listVentes=async (req,res)=>{
    //récupérer la liste des ventes
    const vente=await Vente.find()
    res.render('utilisateurs/pannier',{vente:vente})


}


exports.editVente=async (req,res)=>{
    //créer et instancier un objet Etudiant
    var num=parseInt(req.body._id)


    const vente=await Vente.updateOne({_id:num},{$set:{
        idProduit:req.body.idProduit,
        
        
        datevente:req.body.date,
        quantite:req.body.qte,

    }})
    if(vente.matchedCount)
    {
        res.redirect('/pannier')

    }
    else

    {
        res.status(400).json({'message':'Erreur de modification'})
    }


}


exports.deleteVente=async (req,res)=>{
    //créer et instancier un objet Etudiant
    var num=parseInt(req.body.numerod)


    const vente=await Vente.deleteOne({_id:num})
    if(vente.deletedCount)
    {
        res.redirect('/pannier')

    }
    else

    {
        res.status(400).json({'message':'Erreur de suppression'})
    }


}