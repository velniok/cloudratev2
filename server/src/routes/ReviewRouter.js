const ReviewControllers = require('../controllers/ReviewControllers')
const checkUser = require('../middlewares/checkUser')
const getUser = require('../middlewares/getUser')
const checkAdmin = require('../middlewares/checkAdmin')

const Router = require('express').Router
const router = new Router()

router.post('/create', checkUser, ReviewControllers.create)
router.get('/new-reviews', ReviewControllers.getNewReviews)
router.patch('/add-text/:id', checkUser, getUser, ReviewControllers.addText)
router.post('/toggle-like', checkUser, ReviewControllers.toggleLike)
router.delete('/delete/:id', checkAdmin, ReviewControllers.delete)

module.exports = router