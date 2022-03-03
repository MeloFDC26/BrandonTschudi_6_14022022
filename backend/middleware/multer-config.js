const multer = require('multer');

//Dictionnaire pour la gestion de l'extention du fichier
const MIME_TYPES = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpg',
    'images/png': 'png'
};

//Création objet de configuration de 'multer'
const storage = multer.diskStorage({ 
    destination: (req, file, callback) => { //Destination de stockage défini sur 'images'
        callback(null, 'images')
    },
    filename: (req, file, callback) => { //Configuration du nom du fichier avec gestion des espaces (changés par '_')
        const name = file.originalname.split(' ').join('_');
        const extention = MIME_TYPES[file.mimetype]; //Gestion de l'extention du fichier
        callback(null, name + Date.now() + '.' + extention); //Création du filename avec ajout de la date dans le nom pour le rendre le plus unique possible
    }
});

//Export de multer en passant {storage} et déclarant que cela concerne le type 'image'
module.exports = multer({ storage }).single('image');