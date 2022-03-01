//Création de la base de données modèle utilisateur
const mongoose = require('mongoose');

// Importation du module empechant la création de deux comptes avec le même email
const uniqueMailValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

//Appel du module empechant la création de deux comptes avec le même email
//pour le modèle 'userSchema'
userSchema.plugin(uniqueMailValidator);

//Export de la base créée (objet créé ici)
module.exports = mongoose.model('User', userSchema);