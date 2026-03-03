const { body } = require('express-validator')

const artistValidation = [
    body('name').trim().notEmpty().withMessage("Укажите никнейм артиста"),
    body('soundcloudUrl')
        .trim().notEmpty().withMessage("Укажите ссылку на SoundCloud артиста")
        .isURL().withMessage("Неверный формат ссылки")
]

module.exports = artistValidation