const upload = require('../config/multer')
const ArtistControllers = require('../controllers/ArtistControllers')
const AuthControllers = require('../controllers/AuthControllers')
const GeneralControllers = require('../controllers/GeneralControllers')
const ReviewControllers = require('../controllers/ReviewControllers')
const TrackControllers = require('../controllers/TrackControllers')
const UserControllers = require('../controllers/UserControllers')
const checkAuth = require('../middlewares/checkAuth')
const registerValidation = require('../middlewares/validators/authValidators')

const Router = require('express').Router

const router = new Router()

router.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.status(200).json({
            url: req.file.path
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось загрузить изображение'
        })
    }
})

router.post('/auth/register', registerValidation, AuthControllers.register)
router.post('/auth/login', AuthControllers.login)
router.get('/auth/me', checkAuth, AuthControllers.authMe)

router.get('/user/getOne/:userId', UserControllers.getOne)
router.patch('/user/update/:userId', UserControllers.update)

router.post('/artist/create', ArtistControllers.create)
router.get('/artist/get', ArtistControllers.get)
router.get('/artist/getOne/:id', ArtistControllers.getOne)
router.get('/artist/search', ArtistControllers.search)
router.patch('/artist/update/:id', ArtistControllers.update)
router.delete('/artist/delete/:id', ArtistControllers.delete)

router.post('/track/create', TrackControllers.create)
router.get('/track/get', TrackControllers.get)
router.get('/track/getOne/:id', TrackControllers.getOne)
router.delete('/track/delete/:id', TrackControllers.delete)

router.post('/review/create', ReviewControllers.create)

router.get('/general/get', GeneralControllers.get)

module.exports = router