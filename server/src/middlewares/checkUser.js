const jwt = require('jsonwebtoken')
require('dotenv').config()

const checkUser = (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
        if (!token) return res.status(401).json({ message: 'Не авторизован' })

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY)
        if (decoded.id !== Number(req.params.userId) & decoded.id !== Number(req.body.userId) ) return res.status(403).json({ message: 'Доступ запрещен' })
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Не удалось проверить пользователя' })
    }
}

module.exports = checkUser