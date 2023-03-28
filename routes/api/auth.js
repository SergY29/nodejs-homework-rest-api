const express = require('express')
const router = express.Router()

const { asyncWrapper } = require('../../utils');
const { addNewUserMiddleware, authMiddleware, updateSubscriptionMiddleware, upload, verifyMiddleware } = require('../../middlewares');
const { loginController, registarationController, getUserController, logOutUserController, updateSubscriptionController, updateAvatarController, verifyEmailController, repeatVerifyEmailController } = require('../../controllers/auth');

router.patch('/', authMiddleware, updateSubscriptionMiddleware, asyncWrapper(updateSubscriptionController))
router.patch('/avatars', authMiddleware, upload.single("avatar"), asyncWrapper(updateAvatarController))
router.post('/register', addNewUserMiddleware, asyncWrapper(registarationController))
router.post('/login', addNewUserMiddleware, asyncWrapper(loginController))
router.post('/current', authMiddleware, asyncWrapper(getUserController))
router.post('/logout', authMiddleware, asyncWrapper(logOutUserController))
router.post('/verify', verifyMiddleware, asyncWrapper(repeatVerifyEmailController))
router.get('/verify/:verificationToken', asyncWrapper(verifyEmailController))


module.exports = router