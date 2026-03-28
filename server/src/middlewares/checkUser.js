const AppError = require('../utils/AppError');
const TokenServices = require('../services/TokenServices')
require('dotenv').config()

const checkUser = (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
        if (!token) throw new AppError('Пользователь не авторизован', 401)

        const decoded = TokenServices.validateAccessToken(token)
        if (!decoded) throw new AppError('Сессия устарела', 401)
        if (decoded.id !== Number(req.params.userId) && decoded.id !== Number(req.body.userId) ) throw new AppError('Доступ запрещен', 403)
        next()
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = checkUser