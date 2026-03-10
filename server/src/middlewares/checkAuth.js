const pool = require("../config/db");
const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkAuth = async (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
        if (!token) return res.status(401).json({ message: "Не авторизован" })

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)

        req.userId = decoded.id
        req.userRole = decoded.role
        next()
    } catch (err) {
        res.status(500).json({ message: "Не удалось авторизоваться" })
    }
}

module.exports = checkAuth