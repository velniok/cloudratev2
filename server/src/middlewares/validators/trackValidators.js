const { body } = require('express-validator')

const trackCreateValidation = [
    body('title').trim().notEmpty().withMessage("Укажите название трека"),
    body('artistIds').isArray({ min: 1 }).withMessage("Укажите хотя бы одного артиста"),
    body('releaseData')
        .notEmpty().withMessage("Укажите дату релиза трека")
        .isISO8601().toDate().withMessage('Введите корректную дату (YYYY-MM-DD)')
]

const trackUpdateValidation = [
    body('title').trim().notEmpty().withMessage("Укажите название трека"),
    body('releaseData')
        .notEmpty().withMessage("Укажите дату релиза трека")
        .isISO8601().toDate().withMessage('Введите корректную дату (YYYY-MM-DD)')
]

module.exports = { trackCreateValidation, trackUpdateValidation }