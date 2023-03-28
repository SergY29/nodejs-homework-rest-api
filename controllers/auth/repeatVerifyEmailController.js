const User = require('../../models/auth')
const { NotVerifyError, BadRequestError } = require('../../helpers/errors')
const { sendMail } = require('../../helpers/sendMail')


const repeatVerifyEmailController = async (req, res, next) => {
    const { email } = req.body
    const user = await User.findOne({ email });

    if (!user) {
        throw new NotVerifyError('User not found')
    }

    if (user.verify) {
        throw new BadRequestError('Verification has already been passed')
    }

    const mail = {
        to: email,
        subject: 'Підтвердження реєстрації',
        text: 'Для підтвердження перейдіть за поcиланням:',
        html: `<a href="http://localhost:3035/api/users/verify/${user.verificationToken}"
        >Посилання для підтвердження реєстрації</a>`,
    }

    await sendMail(mail)

    res.status(200).json({
        message: 'Verification email sent',
    })

}

module.exports = repeatVerifyEmailController