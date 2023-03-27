const gravatar = require('gravatar');
const { v4: uuidv4 } = require('uuid');

const User = require('../../models/auth')
const { NotEniqueMailError } = require('../../helpers/errors')
const { sendMail } = require('../../helpers/sendMail')
const { registration } = require('../../service/auth')



const registarationController = async (req, res, next) => {
    const { email, password } = req.body
    const userCheck = await User.findOne({ email });

    if (userCheck) {
        throw new NotEniqueMailError('Email in use')
    }

    const avatarURL = gravatar.url(email);
    const verificationToken = uuidv4();

    const result = await User.create({ email, password, avatarURL, verificationToken });

    const mail = {
        to: email,
        subject: 'Підтвердження реєстрації',
        text: 'Підтвердження реєстрації',
        html: `<a href="localhost:3035/api/users/verify/${verificationToken}" target="_blank">Натисніть для підтвердження</a>`,
    }
    await registration(email, password, avatarURL)

    await sendMail(mail)

    res.status(201).json({
        status: 'created',
        "user": {
            "email": result.email,
            "subscription": result.subscription,
            email,
            "subscription": "starter"
        }
    })
}