require('./Database/Config')
const express=require('express')
var methodOverride = require('method-override')
const Produit = require('./Src/Models/Produit')

const ProduitRoutes = require('./Src/Routers/ProduitRoutes')
const UserRoutes=require("./Src/Routers/UtilisateurRoutes")
const VenteRoutes=require("./Src/Routers/VenteRoutes")
const app=express()
const path = require('path');


const session = require('express-session');
app.use(session({
    secret: 'email',
    resave: false,
    saveUninitialized: true,
}));


//faire appel aux middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
app.use(methodOverride('_method'))
app.use('/',ProduitRoutes)
app.use('/',UserRoutes)
app.use('/',VenteRoutes)

app.use('/public', express.static(path.join(__dirname, 'public')));

app.listen(process.env.APP_PORT,(req,res)=>{
    console.log('Le serveur est démarré sur le port 3000')
})
