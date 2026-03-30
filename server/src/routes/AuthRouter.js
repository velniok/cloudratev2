const AuthControllers = require('../controllers/AuthControllers')
const registerValidation = require('../middlewares/validators/authValidators')

const Router = require('express').Router
const router = new Router()

router.post('/send-verify-code', registerValidation, AuthControllers.sendVerifyCode)
router.post('/register', registerValidation, AuthControllers.register)
router.post('/login', AuthControllers.login)
router.get('/refresh', AuthControllers.refresh)
router.get('/logout', AuthControllers.logout)

module.exports = router