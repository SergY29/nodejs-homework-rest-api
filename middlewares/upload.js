const multer = require('multer')
const path = require('path');



const uploadDir = path.join(__dirname, "../", "tmp")

const storageConfig = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        const { _id } = req.user
        const [extention] = file.originalname.split(".").reverse()
        cb(null, `${_id}.${extention}`);
    },
    limits: {
        fileSize: 1048576,
    },
});

const upload = multer({
    storage: storageConfig,
});


module.exports = upload;