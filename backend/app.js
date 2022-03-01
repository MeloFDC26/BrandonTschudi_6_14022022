const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');

const app = express();
const userRoutes = require('./routes/user');

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

app.use('/api/auth', userRoutes);



module.exports = app;