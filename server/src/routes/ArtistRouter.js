const ArtistControllers = require('../controllers/ArtistControllers')
const checkAdmin = require('../middlewares/checkAdmin')
const checkUser = require('../middlewares/checkUser')
const getUser = require('../middlewares/getUser')
const artistValidation = require('../middlewares/validators/artistValidators')

const Router = require('express').Router
const router = new Router()

router.post('/create', checkAdmin, artistValidation, ArtistControllers.create)
router.get('/list', ArtistControllers.getList)
router.get('/profile/:id', getUser, ArtistControllers.getProfile)
router.get('/tracks/:id', getUser, ArtistControllers.getTracks)
router.patch('/update/:id', checkAdmin, artistValidation, ArtistControllers.update)
router.post('/toggle-follow', checkUser, ArtistControllers.toggleFollow)
router.delete('/delete/:id', checkAdmin, ArtistControllers.delete)

module.exports = router