const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const path = require('path');

require("dotenv").config();

const app = express();
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

//Connection à la base de données (MONGOOSE = noSQL) et protection des données sensibles avec 'dotenv'
console.log(process.env);
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(console.error);

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

//Ajout des routes utilisateur et sauces
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);


module.exports = app;