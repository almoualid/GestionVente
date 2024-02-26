require('./Database/Config')
const express=require('express')
var methodOverride = require('method-override')
const Produit = require('./Src/Models/Produit')
const ProduitRoutes = require('./Src/Routers/ProduitRoutes')
const app=express()

//faire appel aux middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(methodOverride('_method'))
app.use('/',ProduitRoutes)

//app.use('/public', express.static(path.join(__dirname, 'public')));
//app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(process.env.APP_PORT,(req,res)=>{
    console.log('Le serveur est démarré sur le port 3000')
})
