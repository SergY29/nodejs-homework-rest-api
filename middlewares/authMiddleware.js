const jwt = require('jsonwebtoken');
const { NotAutorizedError } = require('../helpers/errors')
const User = require('../models/auth')

const authMiddleware = async (req, res, next) => {
    const { authorization = '' } = req.headers
    const [tokenType, token] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
        next(new NotAutorizedError('Not authorized'))
        return;
    }

    if (!token) {
        next(new NotAutorizedError('Not authorized'))
        return;
    }

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById({ _id })

        if (!user) {
            next(new NotAutorizedError('Not authorized'))
            return;
        }
        req.user = user;
        next();

    } catch (error) {
        next(new NotAutorizedError('Not authorized'))
    }
};


module.exports = authMiddleware