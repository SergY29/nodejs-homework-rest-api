const path = require('path');
const fs = require('fs').promises;
const { NotAutorizedError } = require('../../helpers/errors')
const User = require('../../models/auth')


const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const updateAvatarController = async (req, res, next) => {

    try {
        const { path: tempUpload, filename } = req.file;
        const { _id } = req.user;
        // const [extention] = filename.split(".").reverce();
        // const avatarName = `${_id}.${extention}`;

        const resultUpload = path.join(avatarsDir, filename);
        console.log("resultUpload", resultUpload)

        await fs.rename(tempUpload, resultUpload);

        const avatarURL = path.join("avatars", resultUpload);
        await User.findByIdAndUpdate(_id, { avatarURL });

        res.status(200).json({
            "avatarURL": avatarURL,
        })


    } catch (error) {
        await fs.unlink(req.file.path)
        throw error
    }
}

module.exports = updateAvatarController