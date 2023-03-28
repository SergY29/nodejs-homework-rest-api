const addContactMiddleware = require('./addContactMiddleware')
const changeContactMiddleware = require('./changeContactMiddleware')
const addNewUserMiddleware = require('./addNewUserMiddleware')
const authMiddleware = require('./authMiddleware')
const updateSubscriptionMiddleware = require('./updateSubscriptionMiddleware')
const upload = require('./upload')
const verifyMiddleware = require('./verifyMiddleware')



module.exports = {
    addContactMiddleware,
    changeContactMiddleware,
    addNewUserMiddleware,
    authMiddleware,
    updateSubscriptionMiddleware,
    upload,
    verifyMiddleware,

};