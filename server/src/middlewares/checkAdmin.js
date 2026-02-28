const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkAdmin = (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
        if (!token) return res.status(401).json({ message: 'Не авторизован' })

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        if (decoded.role !== 'admin') return res.status(403).json({ message: 'Доступ запрещен' })

        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Не удалось проверить роль пользователя' })
    }
}

module.exports = checkAdmin