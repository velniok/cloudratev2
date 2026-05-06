const UserServices = require("../services/UserServices")
const ReviewServices = require("../services/ReviewServices")
const AppError = require('../utils/AppError')
const { validationResult } = require('express-validator')
const pool = require("../config/db")
const UserDto = require("../dtos/UserDto")
const ArtistServices = require("../services/ArtistServices")
const SuggestionServices = require("../services/SuggestionServices")

class UserControllers {

    async getList(req, res, next) {
        try {
            const users = await UserServices.getUserList()

            res.status(200).json({users})
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getProfile(req, res, next) {
        try {
            const username = req.params.userId
            const user = await UserServices.getUserByUsername(username)
            if (!user) throw new AppError('Пользователь не найден', 404)

            res.status(200).json({ user })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getReviews(req, res, next) {
        try {
            const userId = req.params.userId
            const { limit, page } = req.query

            const {reviews, total} = await ReviewServices.getReviewsByUser(limit, page, userId)
            res.status(200).json({
                reviews,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total: Number(total),
                    totalPages: Math.ceil(total / limit)
                } })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getFollows(req, res, next) {
        try {
            const userId = req.params.userId
            const authId = req.userId
            const { page, limit } = req.query
            const { artists, total } = await ArtistServices.getArtistsByUser(page, limit, userId, authId)

            res.status(200).json({
                artists,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total: Number(total),
                    totalPages: Math.ceil(total / limit)
                }
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    async getSuggestions(req, res, next) {
        try {
            const userId = req.params.userId
            const { status, page, limit } = req.query
            
            const { suggestions, total } = await SuggestionServices.getSuggestionsByUser(userId, status, page, limit)

            res.status(200).json({
                suggestions,
                pagination: {
                    page: Number(page),
                    limit: Number(limit),
                    total: Number(total),
                    totalPages: Math.ceil(total / limit)
                }
            })
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
            const { nickname, username, email, avatarUrl, password, soundcloudUrl } = req.body

            if (password) {
                await UserServices.updateUserPassword(userId, password)
            }

            const updatedUser = await UserServices.updateUser(userId, [email, nickname, username, avatarUrl, soundcloudUrl])
            if (updatedUser.status === 'email_taken') throw new AppError('Пользователь с таким email уже существует', 409, 'email')
            if (updatedUser.status === 'username_taken') throw new AppError('Уникальный никнейм занят', 409, 'username')
            const user = updatedUser.user
            const userDto = new UserDto(user)

            res.status(200).json({ user: userDto })
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
            await UserServices.deleteUser(userId)

            res.status(200).json({ message: 'Пользователь удален' })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = new UserControllers()
