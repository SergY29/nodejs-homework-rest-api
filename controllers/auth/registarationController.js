const gravatar = require('gravatar');
const { registration } = require('../../service/auth')



const registarationController = async (req, res, next) => {
    const { email, password } = req.body
    const avatarURL = gravatar.url(email);


    await registration(email, password, avatarURL)


    res.status(201).json({
        status: 'created',
        "user": {
            email,
            "subscription": "starter"
        }
    })
}

module.exports = registarationController