const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const AuthServices = require('../services/AuthServices')
const AppError = require('../utils/AppError');
const MailServices = require('../services/MailServices');
require('dotenv').config()

class AuthControllers {

    async sendVerifyCode(req, res, next) {
        try {
            const { email } = req.body

            await MailServices.sendVerifyCode(email)

            res.status(200).json({ message: 'Код отправлен' })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async register(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new AppError(`${errors.array()[0].msg}`, 400, `${errors.array()[0].path}`)

            const { nickname, email, password, verifyCode } = req.body

            const createdUser = await AuthServices.registerUser(password, [email, nickname], verifyCode)
            if (createdUser.status === 'email_taken') throw new AppError('Пользователь с таким email уже существует', 409, 'email')
            const user = createdUser.user
            
            const token = jwt.sign(
                { 
                    id: user.id,
                    role: user.role,
                },
                process.env.TOKEN_SECRET_KEY,
                { expiresIn: "30d" }
            )

            res.status(201).json({ user, token })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body

            const user = await AuthServices.loginUser(email)
            if (!user) throw new AppError('Неправильный email или пароль', 401)

            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) throw new AppError('Неправильный email или пароль', 401)

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role,
                },
                process.env.TOKEN_SECRET_KEY,
                { expiresIn: "30d" }
            )

            res.status(200).json({ user, token })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async authMe(req, res, next) {
        try {
            const userId = req.userId
            const userRole = req.userRole

            const user = await AuthServices.authUser(userId)
            if (!user) throw new AppError('Пользователь не найден', 404)

            if (userRole !== user.role) {
                const token = jwt.sign(
                    {
                    id: userId, role: user.role
                    },
                    process.env.TOKEN_SECRET_KEY,
                    { expiresIn: "30d" }
                )
                res.status(200).json({ user, token })
                return false
            }    

            res.status(200).json({ user })
        } catch (err) {
            console.log(err)
            next(err)       
        }
    }
}

module.exports = new AuthControllers()