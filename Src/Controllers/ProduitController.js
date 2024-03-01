
const Produit =require('../Models/Produit');


// Définir les actions

exports.listProduit=async (req,res)=>{
    //récupérer la liste des étudiants
    const produits=await Produit.find()
    res.render('produits/index',{produits:produits})


}

const path = require('path');

exports.addProd = async (req, res) => {
    try {
        const { idProduit, nom, marque, prix, qtestock } = req.body;

        // Access the uploaded file from req.files.image
        const image = req.files.image ? req.files.image.name : "default.png";

        // Save the file to the public/images directory
        const destPath = path.join(__dirname, '../../views/public/images', image);
        req.files.image.mv(destPath, (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error uploading file');
            }

            // Create and instantiate an Etudiant model instance
            Produit.create({
                idProduit,
                nom,
                marque,
                prix,
                qtestock,
                image,
            });

            // Redirect to the etudiant page
            res.redirect('/produit');
        });
    } catch (error) {
        // Handle errors, e.g., send an error response
        console.error(error);
        res.status(500).send('Error adding product');
    }
};



//Edit student
exports.editProd=async (req,res)=>{
    //créer et instancier un objet Etudiant
    var num=parseInt(req.body.idProduit)


    const produit=await Produit.updateOne({idProduit:num},{$set:{
        idProduit:req.body.idProduit,
        nom:req.body.nom,
        marque:req.body.marque,
        prix:req.body.prix,
        qtestock:req.body.qtestock,

    }})
    if(produit.matchedCount)
    {
        res.redirect('/produit')

    }
    else

    {
        res.status(400).json({'message':'Erreur de modification'})
    }


}

//Edit student
exports.deleteProd=async (req,res)=>{
    //créer et instancier un objet Etudiant
    var num=parseInt(req.body.numerod)


    const produit=await Produit.deleteOne({idProduit:num})
    if(produit.deletedCount)
    {
        res.redirect('/produit')

    }
    else

    {
        res.status(400).json({'message':'Erreur de suppression'})
    }


}
