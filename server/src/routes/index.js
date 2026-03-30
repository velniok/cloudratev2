const GeneralControllers = require('../controllers/GeneralControllers')
const SearchControllers = require('../controllers/SearchControllers')

const checkAdmin = require('../middlewares/checkAdmin')

const AuthRouter = require('./AuthRouter')
const UserRouter = require('./UserRouter')
const ArtistRouter = require('./ArtistRouter')
const TrackRouter = require('./TrackRouter')
const ReviewRouter = require('./ReviewRouter')

const upload = require('../config/multer')

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

router.use('/auth', AuthRouter)
router.use('/user', UserRouter)
router.use('/artist', ArtistRouter)
router.use('/track', TrackRouter)
router.use('/review', ReviewRouter)

router.get('/general/get', checkAdmin, GeneralControllers.get)

router.get('/search', SearchControllers.search)

module.exports = router