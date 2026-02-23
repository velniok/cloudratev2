const upload = require('../config/multer')
const AuthControllers = require('../controllers/AuthControllers')
const UserControllers = require('../controllers/UserControllers')
const checkAuth = require('../middlewares/checkAuth')
const registerValidation = require('../middlewares/validators/authValidators')

const Router = require('express').Router

const router = new Router()

router.post('/upload', upload.single('image'), (req, res) => {
    try {
        res.status(200).json({
            url: `uploads/images/${req.file.filename}`
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

module.exports = router