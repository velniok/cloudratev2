const SuggestionControllers = require('../controllers/SuggestionControllers')
const checkAdmin = require('../middlewares/checkAdmin')
const getUser = require('../middlewares/getUser')

const Router = require('express').Router
const router = new Router()

router.post('/track', getUser, SuggestionControllers.createTrack)
router.get('/track', SuggestionControllers.getTracks)
router.post('/track-accept', checkAdmin, getUser, SuggestionControllers.acceptTrack)
router.post('/track-reject', checkAdmin, getUser, SuggestionControllers.rejectTrack)

module.exports = router