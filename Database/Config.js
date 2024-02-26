const mongoose=require('mongoose')
require('dotenv').config()
// créer une fonction asyn qui permet de se connecter à la base de données

connecter=async ()=>{
    await mongoose.connect(process.env.APP_HOST)
}
connecter()
.then(()=>{
    console.log('La conenxion au serveur de données avec succès')
})
.catch(()=>{
    console.log('Erreur de connexion')

})