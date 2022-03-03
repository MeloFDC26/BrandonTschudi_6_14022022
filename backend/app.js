const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const path = require('path');

const app = express();
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

//Connection à la base de données (MONGOOSE = noSQL)
mongoose
  .connect(
    "mongodb+srv://melo_fdc:italia73@cluster0.13onk.mongodb.net/PIIQUANTE_database?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

//Middleware pour permettre à tout le monde d'utiliser les routes ci-dessous
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use(bodyParser.json());

//Ajout du chemin statique pour le stockage des images
app.use('/images', express.static(path.join(__dirname, 'images'))); //On dit à Express que pour les requêtes vers '/images' on veut servir le dossier 'images'

app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);


module.exports = app;