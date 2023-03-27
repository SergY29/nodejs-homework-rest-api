const loginController = require('./loginController')
const registarationController = require('./registarationController')
const getUserController = require('./getUserController')
const logOutUserController = require('./logOutUserController')
const updateSubscriptionController = require('./updateSubscriptionController')
const updateAvatarController = require('./updateAvatarController')
const verifyEmail = require('./verifyEmail')

module.exports = {
    loginController,
    registarationController,
    getUserController,
    logOutUserController,
    updateSubscriptionController,
    updateAvatarController,
    verifyEmail,

};