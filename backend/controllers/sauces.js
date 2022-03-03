const Sauce = require("../models/Sauce");

//Fonction signup qui crypte le MDP, crée un nouvel utilisateur et l'enregistre dans la base de données
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      return res.status(200).json(sauces);
    })
    .catch((error) => res.status(500).json({ error }));
};

//Fonction qui retrouve

//Fonction qui permet de créer une sauce
exports.createSauce = (req, res) => {
  const sauce = new Sauce(req.body);
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce créée !" }))
    .catch((error) => res.status(400).json({ error }));
};
