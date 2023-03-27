const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../models/auth')
const { NotAutorizedError } = require('../../helpers/errors')


const login = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new NotAutorizedError('Email or password is wrong')
    }

    if (user.verify === false) {
        throw new NotAutorizedError('user not verified')
    }




    if (!await bcrypt.compare(password, user.password)) {
        throw new NotAutorizedError('Email or password is wrong')
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    await User.findByIdAndUpdate(user._id, { token })

    return token;
}

module.exports = login