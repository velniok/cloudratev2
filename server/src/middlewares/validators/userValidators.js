const { body } = require('express-validator')

const userValidation = [
    body('email').isEmail().withMessage("Неверный формат email"),
    body('password')
        .if(body('password').notEmpty())
        .trim().isLength({ min: 6 })
        .withMessage("Пароль должен содержать минимум 6 символов"),
    body('nickname')
        .trim().isLength({ min: 4 }).withMessage("Никнейм должен содержать минимум 4 символа")
        .matches(/^[a-zA-Z0-9_#@-]+$/).withMessage("Никнейм может содержать только латинские буквы, цифры, _, @, - и #"),
    body('username')
        .trim().isLength({ min: 4 }).withMessage("Уник. никнейм должен содержать минимум 4 символа")
        .matches(/^[a-zA-Z]/).withMessage("Уник. никнейм должен начинаться с латинской буквы")
        .matches(/^[a-zA-Z0-9_]+$/).withMessage("Никнейм может содержать только латинские буквы, цифры и _"),
    body('soundcloudUrl')
        .optional({ checkFalsy: true })
        .isURL().withMessage("Неверный формат ссылки")
]

module.exports = userValidation