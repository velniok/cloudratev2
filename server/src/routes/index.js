const GeneralControllers = require('../controllers/GeneralControllers')
const SearchControllers = require('../controllers/SearchControllers')

const checkAdmin = require('../middlewares/checkAdmin')

const AuthRouter = require('./AuthRouter')
const UserRouter = require('./UserRouter')
const ArtistRouter = require('./ArtistRouter')
const TrackRouter = require('./TrackRouter')
const ReviewRouter = require('./ReviewRouter')
const SuggestionsRouter = require('./SuggestionsRouter')

const { upload } = require('../config/multer')
const getUser = require('../middlewares/getUser')
const NotificationControllers = require('../controllers/NotificationControllers')

const cloudinary = require('cloudinary').v2
const Router = require('express').Router
const router = new Router()
require('dotenv').config()

router.post('/upload', upload.single('image'), (req, res, next) => {
    try {
        res.status(200).json({
            url: req.file.path
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
})

router.post('/upload/url', upload.single('image'), async (req, res, next) => {
    try {
        const { url, folder } = req.body
        const result = await cloudinary.uploader.upload(url.replace(/-large(\.(jpg|png|jpeg|gif))$/i, '-t200x200$1'), { folder: `${process.env.IS_DEV ? `dev/${folder}` : folder}` })

        res.status(200).json({
            url: result.secure_url
        })
    } catch (err) {
        console.log(err)
        next(err)
    }
})

router.use('/auth', AuthRouter)
router.use('/user', UserRouter)
router.use('/artist', ArtistRouter)
router.use('/track', TrackRouter)
router.use('/review', ReviewRouter)
router.use('/suggestion', SuggestionsRouter)

router.get('/general/get', checkAdmin, GeneralControllers.get)

router.patch('/notification/read/:id', NotificationControllers.read)

router.get('/search', getUser, SearchControllers.search)

module.exports = router