const SuggestionControllers = require('../controllers/SuggestionControllers')
const checkAdmin = require('../middlewares/checkAdmin')
const getUser = require('../middlewares/getUser')
const suggestionValidation = require('../middlewares/validators/suggestionsValidators')

const Router = require('express').Router
const router = new Router()

router.post('/create', getUser, suggestionValidation, SuggestionControllers.create)
router.get('/list', SuggestionControllers.getList)
router.patch('/update-artist/:id', checkAdmin, SuggestionControllers.updateArtist)
router.patch('/update-feat/:id', checkAdmin, SuggestionControllers.updateFeat)
router.post('/accept', checkAdmin, getUser, SuggestionControllers.accept)
router.post('/reject', checkAdmin, getUser, SuggestionControllers.reject)

module.exports = router