const Joi = require('joi');


const verifyMiddleware = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string()
            .email()
            .required(),
    })

    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
        return res.status(400).json({ message: validationResult.error.details })
    }

    next();
};


module.exports = verifyMiddleware