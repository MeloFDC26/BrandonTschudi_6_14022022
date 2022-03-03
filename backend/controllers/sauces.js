const Sauce = require("../models/Sauce");
const fs = require("fs");

//Fonction qui permet de récupérer toutes les sauces
exports.getAllSauces = (req, res) => {
  Sauce.find()
    .then((sauces) => {
      return res.status(200).json(sauces);
    })
    .catch((error) => res.status(500).json({ error }));
};

//Fonction qui permet de récupérer une sauce
exports.getOneSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      return res.status(200).json(sauce);
    })
    .catch((error) => res.status(500).json({ error }));
};

//Fonction qui permet de créer une sauce avec gestion de l'URL de l'image pour 'multer'
exports.createSauce = (req, res) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject.id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`, //Composition de l'URL
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce créée !" }))
    .catch((error) => res.status(400).json({ error }));
};


//Fonction qui permet de modifier une sauce
exports.updateOneSauce = (req, res) => {
  const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
    .catch(error => res.status(400).json({ error }));
};

//Fonction qui permet de supprimer une sauce
exports.deleteSauce = (req, res) => {
  Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1];
      fs.unlink(`images/${filename}`, () => {
        sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
          .catch(error => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ error }));
};
