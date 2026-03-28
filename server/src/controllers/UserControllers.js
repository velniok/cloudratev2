const UserServices = require("../services/UserServices")
const ReviewServices = require("../services/ReviewServices")
const AppError = require('../utils/AppError')
const { validationResult } = require('express-validator')
const pool = require("../config/db")
const UserDto = require("../dtos/UserDto")

class UserControllers {

    async getAll(req, res, next) {
        try {
            const users = await UserServices.getAllUsers()

            res.status(200).json({users})
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getOne(req, res, next) {
        try {
            const username = req.params.userId
            const user = await UserServices.getUserByUsername(username)
            if (!user) throw new AppError('Пользователь не найден', 404)

            user.reviews = await ReviewServices.getReviewsByUserId(user.id)

            res.status(200).json({ user })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async update(req, res, next) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) throw new AppError(`${errors.array()[0].msg}`, 400, `${errors.array()[0].path}`)

            const userId = Number(req.params.userId)
            const { nickname, username, email, avatarUrl, password } = req.body

            if (password) {
                await UserServices.updateUserPasswordById(userId, password)
            }

            const updatedUser = await UserServices.updateUserById(userId, [email, nickname, username, avatarUrl])
            if (updatedUser.status === 'email_taken') throw new AppError('Пользователь с таким email уже существует', 409, 'email')
            const user = updatedUser.user
            const userDto = new UserDto(user)
            const reviews = await ReviewServices.getReviewsByUserId(userId)

            res.status(200).json({ user: { ...userDto, reviews } })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async updateRole(req, res, next) {
        try {
            const userId = req.params.userId
            const { role } = req.body

            await pool.query(`
                UPDATE users
                    SET role = $1
                WHERE id = $2
            `, [role, userId])

            res.status(200).json({ role })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async delete(req, res, next) {
        try {
            const userId = req.params.userId
            await UserServices.deleteUserById(userId)

            res.status(200).json({ message: 'Пользователь удален' })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new UserControllers()
