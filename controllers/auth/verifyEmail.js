const User = require('../../models/auth')
const { NotVerifyError } = require('../../helpers/errors')


const verifyEmail = async (req, res, next) => {
    const { verificationToken } = req.params
    console.log(verificationToken)

    const user = await User.findOne({ verificationToken });


    if (!user) {

        throw new NotVerifyError('User not found')
    }

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: null });
    res.status(200).json({
        message: 'Verification successful',
    })

}

module.exports = verifyEmail