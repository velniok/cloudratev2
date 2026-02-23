const pool = require('../config/db')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const mapToCamelCase = require('../utils/toCamelCase')
require('dotenv').config()

class AuthControllers {
    async register(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    message: `${errors.array()[0].msg}`
                })
            }

            const { nickname, email, password } = req.body

            const userRes = await pool.query('SELECT * FROM users WHERE email = $1', [email])
            if (userRes.rows.length > 0) {
                return res.status(409).json({
                    message: 'Пользователь с таким email уже существует'
                })
            }

            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password, salt)

            const newUserRes = await pool.query('INSERT INTO users (nickname, email, password) VALUES ($1, $2, $3) RETURNING *', [nickname, email, hashPassword])
            const user = mapToCamelCase(newUserRes.rows[0])

            const token = jwt.sign(
                {
                    id: user.id
                },
                process.env.TOKEN_SECRET_KEY,
                {
                    expiresIn: "30d"
                }
            )

            res.status(201).json( { user, token } )
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось зарегистрироваться'
            })
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body

            const userRes = await pool.query("SELECT * FROM users WHERE email = $1", [email])
            const user = mapToCamelCase(userRes.rows[0])

            if (!user) {
                return res.status(401).json({
                    message: "Неправильный email или пароль"
                })
            }

            const isValidPassword = await bcrypt.compare(password, user.password)

            if (!isValidPassword) {
                return res.status(401).json({
                    message: "Неправильный email или пароль"
                })
            }

            const token = jwt.sign(
                {
                    id: user.id
                },
                process.env.TOKEN_SECRET_KEY,
                {
                    expiresIn: "30d"
                }
            )

            res.status(200).json( { user, token } )
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось войти в аккаунт'
            })
        }
    }

    async authMe(req, res) {
        try {
            const userId = req.userId

            const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [userId])
            const user = mapToCamelCase(userRes.rows[0])

            if (!user) {
                return res.status(404).json({
                    message: "Пользователь не найден"
                })
            }

            res.status(200).json({user})
        } catch (err) {
            console.log(err)
            res.status(500).json({
                message: 'Не удалось авторизоваться'
            })            
        }
    }
}

module.exports = new AuthControllers()