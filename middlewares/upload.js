const multer = require('multer')
const path = require('path');



const uploadDir = path.join(__dirname, "../", "tmp")

const storageConfig = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 1048576,
    },
});

const upload = multer({
    storage: storageConfig,
});


module.exports = upload;