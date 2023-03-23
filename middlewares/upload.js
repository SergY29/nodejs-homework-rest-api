const multer = require('multer')
const path = require('path');
const { v4: uuidv4 } = require('uuid');



const uploadDir = path.join(__dirname, "../", "tmp")

const storageConfig = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        const [extention] = file.originalname.split(".").reverse()
        cb(null, `${uuidv4()}.${extention}`);
    },
    limits: {
        fileSize: 1048576,
    },
});

const upload = multer({
    storage: storageConfig,
});


module.exports = upload;