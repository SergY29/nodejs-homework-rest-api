const Jimp = require("jimp");
const path = require('path');
const fs = require('fs').promises;
const { NotAutorizedError } = require('../../helpers/errors')
const User = require('../../models/auth')


const avatarsDir = path.join(__dirname, "../../", "public", "avatars")

const updateAvatarController = async (req, res, next) => {

    try {
        const { _id } = req.user;
        const { path: tempUpload, filename } = req.file;

        const img = await Jimp.read(tempUpload);
        await img.autocrop().cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(tempUpload)

        const resultUpload = path.join(avatarsDir, filename);
        await fs.rename(tempUpload, resultUpload);

        const avatarURL = path.join("avatars", resultUpload);
        await User.findByIdAndUpdate(_id, { avatarURL });

        res.status(200).json({
            "avatarURL": avatarURL,
        })


    } catch (error) {
        await fs.unlink(req.file.path)
        throw new NotAutorizedError('Not authorized')
    }
}

module.exports = updateAvatarController