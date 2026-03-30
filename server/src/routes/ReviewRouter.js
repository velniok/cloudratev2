const ReviewControllers = require('../controllers/ReviewControllers')
const checkUser = require('../middlewares/checkUser')

const Router = require('express').Router
const router = new Router()

router.post('/create', checkUser, ReviewControllers.create)
router.get('/new-reviews', ReviewControllers.getNewReviews)
router.patch('/add-text/:id', checkUser, ReviewControllers.addText)
router.post('/toggle-like', checkUser, ReviewControllers.toggleLike)

module.exports = router