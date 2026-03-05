const { body } = require('express-validator')

const trackValidation = [
    body('title').trim().notEmpty().withMessage("Укажите название трека"),
    body('artistIds').isArray({ min: 1 }).withMessage("Укажите хотя бы одного артиста")
]

module.exports = trackValidation