const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Connection à la base de données (MONGOOSE = noSQL)
mongoose
  .connect(
    "mongodb+srv://melo_fdc:italia73@cluster0.13onk.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());



module.exports = app;