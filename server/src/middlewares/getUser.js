const AppError = require('../utils/AppError');
const TokenServices = require('../services/TokenServices')
require('dotenv').config()

const getUser = (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
        if (!token) {
            req.userId = undefined
        } else {
            const decoded = TokenServices.validateAccessToken(token)
            if (!decoded) throw new AppError('Сессия устарела', 401)
            req.userId = decoded.id
        }
        next()
    } catch (err) {
        console.log(err)
        next(err)
    }
}

module.exports = getUser