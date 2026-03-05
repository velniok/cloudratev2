const { body } = require('express-validator')

const registerValidation = [
    body('email').isEmail().withMessage("Неверный формат email"),
    body('password')
        .trim().isLength({ min: 6 })
        .withMessage("Пароль должен содержать минимум 6 символов"),
    body('nickname')
        .trim().isLength({ min: 4 })
        .withMessage("Никнейм должен содержать минимум 4 символа")
]

module.exports = registerValidation