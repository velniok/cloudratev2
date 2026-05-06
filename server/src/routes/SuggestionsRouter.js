const SuggestionControllers = require('../controllers/SuggestionControllers')
const checkAdmin = require('../middlewares/checkAdmin')
const getUser = require('../middlewares/getUser')
const suggestionValidation = require('../middlewares/validators/suggestionsValidators')

const Router = require('express').Router
const router = new Router()

router.post('/track', getUser, suggestionValidation, SuggestionControllers.createTrack)
router.get('/track', SuggestionControllers.getTracks)
router.patch('/track-update-artist/:id', checkAdmin, SuggestionControllers.updateTrackArtist)
router.patch('/track-update-feat/:id', checkAdmin, SuggestionControllers.updateTrackFeat)
router.post('/track-accept', checkAdmin, getUser, SuggestionControllers.acceptTrack)
router.post('/track-reject', checkAdmin, getUser, SuggestionControllers.rejectTrack)

module.exports = router