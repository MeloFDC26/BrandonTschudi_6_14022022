const Sauce = require("../models/Sauce");
const fs = require("fs");

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
      if (!sauce) {
        return res.status(404).json({ message: "Sauce non trouvée !"});
      }
      return res.status(200).json(sauce);
    })
    .catch((error) => res.status(404).json({ error }));
};

//Fonction qui permet de créer une sauce avec gestion de l'URL de l'image pour 'multer'
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`, //Composition de l'URL
  });
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce créée !" }))
    .catch((error) => res.status(400).json({ error }));
};

//Fonction qui permet de modifier une sauce
exports.updateOneSauce = (req, res, next) => {
  if (req.file) {
    Sauce.findOne({ _id: req.params.id })
      .then((sauce) => {
        if (!sauce) {
          return res.status(404).json({ message: "Sauce non trouvée !"});
        }
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          const sauceObject = {
            ...JSON.parse(req.body.sauce),
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
          Sauce.updateOne(
            { _id: req.params.id },
            { ...sauceObject, _id: req.params.id }
          )
            .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    const sauceObject = { ...req.body };
    Sauce.updateOne(
      { _id: req.params.id },
      { ...sauceObject, _id: req.params.id }
    )
      .then(() => res.status(200).json({ message: "Sauce modifiée !" }))
      .catch((error) => res.status(400).json({ error }));
  }
};

//Fonction qui permet de supprimer une sauce
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({ message: "Sauce non trouvée !"});
      }
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        sauce
          .deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

//"Likes" et "Dislikes" (+1, 0, -1)

//Si l'utilisateur 'like' cette sauce
exports.likeSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      if (!sauce) {
        return res.status(404).json({ message: "Sauce non trouvée !"});
      }
      let message;
      switch (
        req.body.like //Dans le cas où req.body.like = 1, on éxécute case 1;
      ) {
        case 1:
          sauce.likes += 1;
          sauce.usersLiked.push(req.body.userId);
          message = "Like ajouté !";
          break;
        case 0: //Annulation du choix
          const isLiked = sauce.usersLiked.findIndex((userId) => {
            //On veut savoir si l'id est contenu dans un tableau ou l'autre
            return userId === req.body.userId;
          });
          const isDisliked = sauce.usersDisliked.findIndex((userId) => {
            return userId === req.body.userId;
          });
          if (isLiked > -1) {
            sauce.likes -= 1;
            sauce.usersLiked.splice(isLiked, 1);
            message = "Like retiré !";
          } else if (isDisliked > -1) {
            sauce.dislikes -= 1;
            sauce.usersDisliked.splice(isDisliked, 1);
            message = "Dislike retiré !";
          }
          break;
        case -1:
          sauce.dislikes += 1;
          sauce.usersDisliked.push(req.body.userId);
          message = "Dislike ajouté !";
          break;
      }
      sauce
        .save()
        .then(() => {
          return res.status(200).json({ message });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
