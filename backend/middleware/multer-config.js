const multer = require("multer");

//Dictionnaire pour la gestion de l'extention du fichier
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

//Création objet de configuration de 'multer'
const storage = multer.diskStorage({
  //Destination de stockage défini sur 'images'
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  //Configuration du nom du fichier avec gestion des espaces (changés par '_')
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype]; //Gestion de l'extention du fichier
    callback(null, name + Date.now() + "." + extension); //Création du filename avec ajout de la date dans le nom pour le rendre le plus unique possible
  },
});

//Export de multer en passant {storage} et déclarant que cela concerne le type 'image'
module.exports = multer({storage: storage}).single("image");
