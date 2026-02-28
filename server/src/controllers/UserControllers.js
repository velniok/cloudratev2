const UserServices = require("../services/UserServices")
const ReviewServices = require("../services/ReviewServices")
const AppError = require('../utils/AppError')
const { validationResult } = require('express-validator')

class UserControllers {
    async getOne(req, res, next) {
        try {
            const userId = req.params.userId
            const user = await UserServices.getUserById(userId)
            if (!user) throw new AppError('Пользователь не найден', 404)

            user.reviews = await ReviewServices.getReviewsByUserId(userId)

            res.status(200).json({ user })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new AppError(`${errors.array()[0].msg}`, 400)

            const userId = Number(req.params.userId)
            const { nickname, email, avatarUrl, password } = req.body

            if (password) {
                await UserServices.updateUserPasswordById(userId, password)
            }

            const updatedUser = await UserServices.updateUserById(userId, [email, nickname, avatarUrl])
            if (updatedUser.status === 'email_taken') throw new AppError('Пользователь с таким email уже существует', 409)
            const user = updatedUser.user
            user.reviews = await ReviewServices.getReviewsByUserId(userId)

            res.status(200).json({ user })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new UserControllers()
