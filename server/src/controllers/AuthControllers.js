const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const AuthServices = require('../services/AuthServices')
const AppError = require('../utils/AppError');
const MailServices = require('../services/MailServices');
const TokenServices = require('../services/TokenServices');
const UserDto = require('../dtos/UserDto');
const jwt = require('jsonwebtoken');
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
            const userDto = new UserDto(user)

            const { accessToken, refreshToken } = TokenServices.generateTokens({ id: userDto.id, role: userDto.role })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000
            })

            res.status(201).json({ user, token: accessToken })
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

            const userDto = new UserDto(user)

            const { accessToken, refreshToken } = TokenServices.generateTokens({ id: userDto.id, role: userDto.role })
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000
            })

            res.status(200).json({ user: userDto, token: accessToken })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async refresh(req, res, next) {
        try {

            const refreshToken = req.cookies.refreshToken
            if (!refreshToken) throw new AppError('Пользователь не авторизован', 401)
            
            const decoded = TokenServices.validateRefreshToken(refreshToken)
            if (!decoded) throw new AppError('Сессия устарела, авторизуйтесь заново', 401)

            const user = await AuthServices.authUser(decoded.id)
            if (!user) throw new AppError('Пользователь не найден', 404)
            const userDto = new UserDto(user)

            const { accessToken, refreshToken: newRefresh } = TokenServices.generateTokens({ id: userDto.id, role: userDto.role })
            res.cookie('refreshToken', newRefresh, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                maxAge: 30 * 24 * 60 * 60 * 1000
            })

            res.json({ user: userDto, token: accessToken })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async logout(req, res, next) {
        try {
            res.clearCookie('refreshToken')
            res.status(200).json({ message: 'Пользователь успешно вышел из аккаунта' })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new AuthControllers()