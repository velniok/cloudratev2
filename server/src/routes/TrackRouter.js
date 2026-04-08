const TrackControllers = require('../controllers/TrackControllers')
const checkAdmin = require('../middlewares/checkAdmin')
const getUser = require('../middlewares/getUser')
const trackValidation = require('../middlewares/validators/trackValidators')

const Router = require('express').Router
const router = new Router()

router.post('/create', checkAdmin, trackValidation.trackCreateValidation, TrackControllers.create)
router.post('/suggestion', getUser, TrackControllers.createSuggestion)
router.get('/suggestion', TrackControllers.getSuggestions)
router.get('/soundcloud-info', checkAdmin, TrackControllers.getSoundcloudInfo)
router.get('/list', TrackControllers.getList)
router.get('/new-tracks', TrackControllers.getNewTracks)
router.get('/profile/:id', getUser, TrackControllers.getProfile)
router.get('/reviews-text/:id', getUser, TrackControllers.getReviewsText)
router.patch('/update/:id', checkAdmin, trackValidation.trackUpdateValidation, TrackControllers.update)
router.delete('/delete/:id', checkAdmin, TrackControllers.delete)

module.exports = router