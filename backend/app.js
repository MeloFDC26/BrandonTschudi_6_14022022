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

app.use(express.json());
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);



module.exports = app;