const pool = require("../config/db")
const bcrypt = require('bcrypt')
const mapToCamelCase = require("../utils/toCamelCase")
const UserServices = require("../services/UserServices")
const ReviewServices = require("../services/ReviewServices")

class UserControllers {
    async getOne(req, res) {
        try {
            const userId = req.params.userId
            const user = await UserServices.getUserById(userId)

            if (!user) return res.status(404).json({ message: "Пользователь не найден" })

            user.reviews = await ReviewServices.getReviewsByUserId(userId)

            res.status(200).json({user})
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: 'Не удалось получить пользователя' })
        }
    }

    async update(req, res) {
        try {
            const userId = Number(req.params.userId)
            const { nickname, email, avatarUrl, password } = req.body

            const userResWhereEmail = await pool.query("SELECT * FROM users WHERE email = $1", [email])
            if (userResWhereEmail.rows.length > 0 && userId !== userResWhereEmail.rows[0].id) {
                return res.status(409).json({
                    message: 'Пользователь с таким email уже существует'
                })
            }

            if (password) {
                const salt = await bcrypt.genSalt(10)
                const hashPassword = await bcrypt.hash(password, salt)
                await pool.query('UPDATE users SET password = $2 WHERE id = $1 RETURNING *', [userId, hashPassword])
            }

            const userRes = await pool.query('UPDATE users SET nickname = $2, email = $3, avatar_url = $4 WHERE id = $1 RETURNING *', [userId, nickname, email, avatarUrl])
            const user = mapToCamelCase(userRes.rows[0])

            res.status(200).json({user})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось изменить пользователя'
            })
        }
    }
}

module.exports = new UserControllers()
