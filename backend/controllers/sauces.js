const Sauce = require("../models/Sauce");

//Fonction qui permet de récupérer toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauce.find()
    .then((sauces) => {
      return res.status(200).json(sauces);
    })
    .catch((error) => res.status(500).json({ error }));
};

//Fonction qui permet de récupérer une sauce
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      return res.status(200).json(sauce);
    })
    .catch((error) => res.status(500).json({ error }));
};

//Fonction qui permet de créer une sauce
exports.createSauce = (req, res) => {
  const sauce = new Sauce(req.body);
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce créée !" }))
    .catch((error) => res.status(400).json({ error }));
};

//Fonction qui permet de modifier une sauce
exports.updateOneSauce = (req, res, next) => {
  const sauce = req.body;
  Sauce.updateOne({ _id: req.params.id }, { ...sauce, _id: req.params.id })
    .then(() => res.status(201).json({ message: "Sauce modifiée !" }))
    .catch((error) => res.status(400).json({ error }));
};
