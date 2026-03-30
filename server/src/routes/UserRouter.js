const UserControllers = require('../controllers/UserControllers')
const checkAdmin = require('../middlewares/checkAdmin')
const checkUser = require('../middlewares/checkUser')
const userValidation = require('../middlewares/validators/userValidators')

const Router = require('express').Router
const router = new Router()

router.get('/profile/:userId', UserControllers.getProfile)
router.get('/list', UserControllers.getList)
router.get('/reviews/:userId', UserControllers.getReviews)
router.get('/follows/:userId', UserControllers.getFollows)
router.patch('/update/:userId', checkUser, userValidation, UserControllers.update)
router.patch('/update-role/:userId', checkAdmin, UserControllers.updateRole)
router.delete('/delete/:userId', checkAdmin, UserControllers.delete)

module.exports = router